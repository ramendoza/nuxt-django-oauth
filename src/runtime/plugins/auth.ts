import { saveToken, getToken, clearToken } from '../utils/token'
import type { TokenData, DefaultUser } from '../types'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public.djangoOAuth
  const state = reactive<{ user: DefaultUser | null; token: TokenData | null; loading: boolean }>({
    user: null,
    token: getToken(),
    loading: false
  })

  async function login(username: string, password: string) {
    state.loading = true
    try {
      const res = await $fetch<TokenData>(`${config.apiBase}${config.endpoints.token}`, {
        method: 'POST',
        body: { grant_type: 'password', username, password, client_id: config.clientId }
      })
      saveToken(res)
      state.token = res
      await fetchUser()
    } finally {
      state.loading = false
    }
  }

  async function refreshToken() {
    if (!state.token?.refresh_token) return
    const res = await $fetch<TokenData>(`${config.apiBase}${config.endpoints.refresh}`, {
      method: 'POST',
      body: { grant_type: 'refresh_token', refresh_token: state.token.refresh_token, client_id: config.clientId }
    })
    saveToken(res)
    state.token = res
  }

  async function fetchUser() {
    const token = getToken()
    if (!token?.access_token) return
    const user = await $fetch<DefaultUser>(`${config.apiBase}${config.endpoints.user}`, {
      headers: { Authorization: `Bearer ${token.access_token}` }
    })
    state.user = user
  }

  async function logout() {
    try {
      if (state.token?.access_token) {
        await $fetch(`${config.apiBase}${config.endpoints.revoke}`, {
          method: 'POST',
          body: { token: state.token.access_token, client_id: config.clientId }
        })
      }
    } finally {
      clearToken()
      state.user = null
      state.token = null
      navigateTo(config.loginPath)
    }
  }

  return { provide: { auth: { state, login, logout, refreshToken, fetchUser } } }
})
