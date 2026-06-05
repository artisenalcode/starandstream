import type { APIRoute } from 'astro'

import { sendEmail, ensureSmtpConfigured } from '../../lib/email'
import { checkRateLimit } from '../../lib/rate-limit'
import { sanitize } from '../../lib/sanitize'

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

    const smtpError = ensureSmtpConfigured()
    if (smtpError) return smtpError

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

    await sendEmail({
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
