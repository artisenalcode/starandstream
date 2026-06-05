export const sanitize = (value: unknown) => (typeof value === 'string' ? value : '').trim()
