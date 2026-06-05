import type { APIRoute } from 'astro'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.zoho.com',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

const MAX_SUBMISSIONS = 5
const WINDOW_MS = 60 * 60 * 1000

const rateMap = new Map<string, { count: number; windowStart: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    rateMap.set(ip, { count: 1, windowStart: now })
    return true
  }

  if (entry.count >= MAX_SUBMISSIONS) {
    return false
  }

  entry.count++
  return true
}

const sanitize = (value: unknown) => (typeof value === 'string' ? value : '').trim()

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!checkRateLimit(clientAddress)) {
    console.warn(`Rate limit exceeded for IP: ${clientAddress}`)
    return new Response(
      JSON.stringify({
        ok: false,
        error: 'Too many submissions. Please try again later.'
      }),
      { status: 429 }
    )
  }

  try {
    const payload = await request.json()

    const name = sanitize(payload.name)
    const email = sanitize(payload.email)
    const role = sanitize(payload.role)
    const interest = sanitize(payload.interest)
    const courseName = sanitize(payload.courseName)

    if (!name || !email || !role || !courseName) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: 'name, email, role, and courseName are required.'
        }),
        { status: 400 }
      )
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('SMTP credentials not configured')
      return new Response(
        JSON.stringify({
          ok: false,
          error: 'SMTP is not configured. Set SMTP_USER and SMTP_PASS environment variables.'
        }),
        { status: 500 }
      )
    }

    const fromEmail = process.env.FROM_EMAIL || 'contact@starandstream.com'
    const toEmail = process.env.TO_EMAIL || 'alvin@starandstream.com'

    const subject = `Course Pre-registration: ${courseName} - ${name}`
    const textBody = [
      `Course: ${courseName}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Role: ${role}`,
      '',
      'Interest / Reason:',
      interest || 'Not provided'
    ].join('\n')

    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject,
      text: textBody
    })

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (error) {
    console.error('SMTP send error:', error)
    return new Response(JSON.stringify({ ok: false, error: 'Message delivery failed.' }), {
      status: 500
    })
  }
}
