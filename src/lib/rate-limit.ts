const MAX_SUBMISSIONS = 5
const WINDOW_MS = 60 * 60 * 1000

const rateMap = new Map<string, { count: number; windowStart: number }>()

export function checkRateLimit(ip: string): boolean {
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
