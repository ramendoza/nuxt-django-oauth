import { getToken } from '../utils/token'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public.djangoOAuth
  const token = getToken()
  if (!token?.access_token) return

  const originalFetch = globalThis.$fetch
  globalThis.$fetch = (request: string, opts: any = {}) => {
    opts.headers = opts.headers || {}
    if (token?.access_token) opts.headers['Authorization'] = `Bearer ${token.access_token}`
    if (request.startsWith('/') && config.apiBase) request = `${config.apiBase}${request}`
    return originalFetch(request, opts)
  }
})
