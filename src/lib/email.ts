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

export function sendEmail(opts: {
  to: string
  from: string
  replyTo: string
  subject: string
  text: string
}) {
  return transporter.sendMail(opts)
}

export function ensureSmtpConfigured(): Response | null {
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
  return null
}
