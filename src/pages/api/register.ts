import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2'
import type { APIRoute } from 'astro'

const client = new SESv2Client({ region: process.env.AWS_REGION || 'us-west-1' })

const sanitize = (value: any) => (value || '').toString().trim()

export const POST: APIRoute = async ({ request }) => {
  try {
    const payload = await request.json()

    const name = sanitize(payload.name)
    const email = sanitize(payload.email)
    const role = sanitize(payload.role)
    const interest = sanitize(payload.interest)
    const courseName = sanitize(payload.courseName)

    if (!name || !email || !role || !courseName) {
      return new Response(
        JSON.stringify({ ok: false, error: 'name, email, role, and courseName are required.' }),
        { status: 400 }
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
