import type { DefaultUser } from '../types'

export const useAuth = () => {
  const { $auth } = useNuxtApp()
  return $auth as {
    state: { user: DefaultUser | null; token: any; loading: boolean }
    login(username: string, password: string): Promise<void>
    logout(): Promise<void>
    refreshToken(): Promise<void>
    fetchUser(): Promise<void>
  }
}
