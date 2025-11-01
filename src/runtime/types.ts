export interface TokenData {
  access_token: string
  refresh_token: string
  token_type?: string
  expires_in?: number
  expires_at?: number
}

export interface DefaultUser {
  id?: string | number
  username?: string
  email?: string
  [key: string]: any
}

export interface DjangoOAuthOptions<UserType = DefaultUser> {
  apiBase: string
  clientId: string
  endpoints: {
    token: string
    refresh: string
    revoke: string
    user: string
  }
  userType?: string
  loginPath?: string
  userShape?: UserType
}
