import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2'
import type { APIRoute } from 'astro'

const client = new SESv2Client({ region: process.env.AWS_REGION || 'us-west-1' })

const sanitize = (value: any) => (value || '').toString().trim()

export const POST: APIRoute = async ({ request }) => {
  try {
    const payload = await request.json()

    const name = sanitize(payload.name)
    const email = sanitize(payload.email)
    const message = sanitize(payload.message)

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ ok: false, error: 'name, email, and message are required.' }),
        { status: 400 }
      )
    }

    const fromEmail = process.env.FROM_EMAIL || 'contact@starandstream.com'
    const toEmail = process.env.TO_EMAIL || 'alvin@starandstream.com'

    const subject = `Contact form submission from: ${name}`
    const textBody = [`Name: ${name}`, `Email: ${email}`, '', 'Message:', message].join('\n')

    await client.send(
      new SendEmailCommand({
        FromEmailAddress: fromEmail,
        Destination: { ToAddresses: [toEmail] },
        ReplyToAddresses: [email],
        Content: {
          Simple: {
            Subject: { Data: subject },
            Body: { Text: { Data: textBody } }
          }
        }
      })
    )

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Message delivery failed.' }), {
      status: 500
    })
  }
}
