import { createFileRoute } from '@tanstack/react-router'
import { Resend } from 'resend'
import { z } from 'zod'
import { createHash } from 'node:crypto'

const WaitlistSchema = z.object({
  name: z.string().trim().min(1).max(80),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email()
    .max(254),

  turnstileToken: z.string().min(1).max(4096),

  website: z.string().max(200).optional().default(''),
})

function jsonResponse(
  body: Record<string, unknown>,
  status = 200,
) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  })
}

function emailHash(email: string) {
  return createHash('sha256')
    .update(email)
    .digest('hex')
}

async function verifyTurnstile(
  token: string,
  request: Request,
) {
  const secret =
    process.env['TURNSTILE_SECRET_KEY']

  if (!secret) {
    throw new Error(
      'TURNSTILE_SECRET_KEY is missing',
    )
  }

  const forwardedFor =
    request.headers.get('x-forwarded-for')

  const ip =
    forwardedFor?.split(',')[0]?.trim()

  const form = new FormData()

  form.append('secret', secret)
  form.append('response', token)

  if (ip) {
    form.append('remoteip', ip)
  }

  const verifyResponse = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      body: form,
    },
  )

  if (!verifyResponse.ok) {
    return false
  }

  const result = await verifyResponse.json()

  if (!result.success) {
    return false
  }

  if (result.action !== 'waitlist') {
    return false
  }

  const appOrigin =
    process.env['APP_ORIGIN']

  if (appOrigin) {
    const expectedHostname =
      new URL(appOrigin).hostname

    if (
      result.hostname !== expectedHostname
    ) {
      return false
    }
  }

  return true
}

export const Route = createFileRoute(
  '/api/waitlist',
)({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const origin =
            request.headers.get('origin')

          const allowedOrigin =
            process.env['APP_ORIGIN']

          if (
            allowedOrigin &&
            origin !== allowedOrigin
          ) {
            return jsonResponse(
              {
                success: false,
                message:
                  'Request rejected.',
              },
              403,
            )
          }

          let rawBody: unknown

          try {
            rawBody =
              await request.json()
          } catch {
            return jsonResponse(
              {
                success: false,
                message:
                  'Invalid request.',
              },
              400,
            )
          }

          const parsed =
            WaitlistSchema.safeParse(
              rawBody,
            )

          if (!parsed.success) {
            return jsonResponse(
              {
                success: false,
                message:
                  'Please enter a valid name and email.',
              },
              400,
            )
          }

          const {
            name,
            email,
            turnstileToken,
            website,
          } = parsed.data

          if (website) {
            console.warn(
              'Waitlist honeypot triggered',
            )

            return jsonResponse({
              success: true,
            })
          }

          const human =
            await verifyTurnstile(
              turnstileToken,
              request,
            )

          if (!human) {
            return jsonResponse(
              {
                success: false,
                message:
                  'Verification failed. Please try again.',
              },
              400,
            )
          }

          const apiKey =
            process.env['RESEND_API_KEY']

          const segmentId =
            process.env['RESEND_SEGMENT_ID']

          const from =
            process.env['RESEND_FROM_EMAIL']

          const adminEmail =
            process.env['ADMIN_EMAIL']

          if (
            !apiKey ||
            !segmentId ||
            !from ||
            !adminEmail
          ) {
            throw new Error(
              'Required server configuration is missing',
            )
          }

          const resend =
            new Resend(apiKey)

          const existing =
            await resend.contacts.get({
              email,
            })

          let contactId:
            | string
            | undefined

          let isNew = false

          if (existing.data) {
            contactId =
              existing.data.id
          } else {
            if (
              existing.error &&
              existing.error.statusCode !==
                404
            ) {
              throw new Error(
                'Could not check contact',
              )
            }

            const created =
              await resend.contacts.create({
                email,
                firstName: name,
                unsubscribed: false,
              })

            if (created.error) {
              if (
                created.error.statusCode ===
                409
              ) {
                const retryExisting =
                  await resend.contacts.get({
                    email,
                  })

                contactId =
                  retryExisting.data?.id
              } else {
                throw new Error(
                  'Could not create contact',
                )
              }
            } else {
              contactId =
                created.data?.id
              isNew = true
            }
          }

          if (!contactId) {
            throw new Error(
              'Contact ID missing',
            )
          }

          const segmentResponse =
            await fetch(
              `https://api.resend.com/segments/${segmentId}/contacts`,
              {
                method: 'POST',
                headers: {
                  Authorization:
                    `Bearer ${apiKey}`,
                  'Content-Type':
                    'application/json',
                },
                body: JSON.stringify({
                  contact_id: contactId,
                }),
              },
            )

          if (
            !segmentResponse.ok &&
            segmentResponse.status !== 409
          ) {
            throw new Error(
              'Could not add contact to segment',
            )
          }

          if (!isNew) {
            return jsonResponse({
              success: true,
              alreadyJoined: true,
              message:
                "You're already on the Charter waitlist.",
            })
          }

          const hash =
            emailHash(email)

          const userEmail =
            await resend.emails.send(
              {
                from,
                to: [email],

                subject:
                  "You're on the Charter early-access list.",

                html: `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#FCF6ED;font-family:Arial,Helvetica,sans-serif;color:#111111;">
    <div style="max-width:600px;margin:0 auto;padding:48px 24px;">
      <div style="border:2px solid #111111;border-radius:24px;background:#C9BBEF;padding:40px;">
        <div style="font-size:24px;font-weight:700;margin-bottom:28px;">
          Charter
        </div>

        <h1 style="margin:0 0 18px;font-size:34px;line-height:1.1;">
          You're on the list.
        </h1>

        <p style="margin:0;font-size:17px;line-height:1.6;">
          We're starting with a small group of freelancers and we'll reach out as Charter early-access spots open.
        </p>
      </div>

      <p style="color:#55524D;font-size:13px;line-height:1.5;margin-top:24px;">
        You received this because you joined the Charter early-access list.
      </p>
    </div>
  </body>
</html>
                `,
              },
              {
                idempotencyKey:
                  `charter-waitlist-user-v1-${hash}`,
              },
            )

          if (userEmail.error) {
            console.error(
              'Confirmation email failed',
              userEmail.error,
            )
          }

          const adminNotification =
            await resend.emails.send(
              {
                from,
                to: [adminEmail],

                subject:
                  'New Charter waitlist signup',

                text: [
                  'New Charter waitlist signup',
                  '',
                  `Name: ${name}`,
                  `Email: ${email}`,
                  `Time: ${new Date().toISOString()}`,
                ].join('\n'),
              },
              {
                idempotencyKey:
                  `charter-waitlist-admin-v1-${hash}`,
              },
            )

          if (
            adminNotification.error
          ) {
            console.error(
              'Admin notification failed',
              adminNotification.error,
            )
          }

          return jsonResponse(
            {
              success: true,
              alreadyJoined: false,
              message:
                "You're on the Charter early-access list.",
            },
            201,
          )
        } catch (error) {
          console.error(
            'Waitlist endpoint failed',
            error,
          )

          return jsonResponse(
            {
              success: false,
              message:
                'Something went wrong. Please try again.',
            },
            500,
          )
        }
      },
    },
  },
})
