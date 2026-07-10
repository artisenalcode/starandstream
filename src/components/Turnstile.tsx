import { useEffect } from 'react'

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js'

/**
 * Empty when unset, which is the local-dev and test path: every call site
 * guards on it, so no widget renders and no token is required. form-api
 * mirrors this — it only verifies when TURNSTILE_SECRET_KEY is present.
 */
export const TURNSTILE_SITE_KEY = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || ''

/** Inject Cloudflare's script once per page, however many widgets are on it. */
export function useTurnstileScript() {
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return

    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    script.defer = true
    document.head.appendChild(script)
  }, [])
}

/**
 * The widget is configured invisible in Cloudflare, so this renders nothing
 * visible; it exists so the script can find a mount point and write the token
 * into the `cf-turnstile-response` field that FormData then picks up.
 */
export function TurnstileWidget({ action }: { action: string }) {
  if (!TURNSTILE_SITE_KEY) return null
  return <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} data-action={action} />
}

/** Read the token the widget wrote into the form. */
export function turnstileToken(formData: FormData): string {
  return String((formData.get('cf-turnstile-response') as string) || '').trim()
}
