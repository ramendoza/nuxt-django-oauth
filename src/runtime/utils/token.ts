import type { TokenData } from '../types'

export function saveToken(token: TokenData) {
  const expiresAt = Date.now() + (token.expires_in || 0) * 1000
  const data = { ...token, expires_at: expiresAt }
  if (process.client) localStorage.setItem('auth_token', JSON.stringify(data))
  useCookie('auth_token').value = JSON.stringify(data)
}

export function getToken(): TokenData | null {
  const cookie = useCookie<string | null>('auth_token')
  let data = cookie.value ? JSON.parse(cookie.value) : null
  if (!data && process.client) {
    const local = localStorage.getItem('auth_token')
    data = local ? JSON.parse(local) : null
  }
  return data
}

export function clearToken() {
  useCookie('auth_token').value = null
  if (process.client) localStorage.removeItem('auth_token')
}
