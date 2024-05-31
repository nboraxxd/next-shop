import http from '@/lib/http'
import envConfig from '@/constants/config'
import { MessageResponse } from '@/types'
import {
  AuthNextServerReqBody,
  AuthNextServerResponse,
  AuthServerResponse,
  LoginReqBody,
  RegisterReqBody,
} from '@/types/auth.type'

const authApi = {
  // API of backend server
  register: (body: RegisterReqBody) => http.post<AuthServerResponse>('/auth/register', body),

  login: (body: LoginReqBody) => http.post<AuthServerResponse>('/auth/login', body),

  slideSessionFromNextServerToServer: (sessionToken: string) => {
    return http.post<AuthServerResponse>(
      '/auth/slide-session',
      {},
      { headers: { Authorization: `Bearer ${sessionToken}` } }
    )
  },

  logoutFromNextServerToServer: (sessionToken: string) => {
    return http.post<MessageResponse>('/auth/logout', {}, { headers: { Authorization: `Bearer ${sessionToken}` } })
  },

  // API of Next.js server
  authNextServer: (body: AuthNextServerReqBody) => {
    return http.post<AuthNextServerResponse>('/api/auth', body, { baseUrl: envConfig.NEXT_URL })
  },

  logoutFromNextClientToNextServer: (force?: boolean, signal?: AbortSignal) => {
    return http.post<MessageResponse>('/api/auth/logout', { force }, { baseUrl: envConfig.NEXT_URL, signal })
  },

  slideSessionFromNextClientToNextServer: () => {
    return http.post<AuthServerResponse>('/api/auth/slide-session', {}, { baseUrl: envConfig.NEXT_URL })
  },
}

export default authApi
