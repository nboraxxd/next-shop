import http from '@/lib/http'
import envConfig from '@/constants/config'
import { MessageResponse } from '@/types/common.type'
import {
  AuthNextServerReqBody,
  AuthNextServerResponse,
  AuthResponse,
  LoginReqBody,
  RegisterReqBody,
} from '@/types/auth.type'

const authApi = {
  // API from backend server
  register: (body: RegisterReqBody) => http.post<AuthResponse>('/auth/register', body),

  login: (body: LoginReqBody) => http.post<AuthResponse>('/auth/login', body),

  logoutFromNextServerToServer: (sessionToken: string) => {
    return http.post<MessageResponse>('/auth/logout', {}, { headers: { Authorization: `Bearer ${sessionToken}` } })
  },

  // API from Next.js server
  authNextServer: (body: AuthNextServerReqBody) => {
    return http.post<AuthNextServerResponse>('/api/auth', body, { baseUrl: envConfig.NEXT_URL })
  },

  logoutFromNextClientToNextServer: (force?: boolean, signal?: AbortSignal) => {
    return http.post<MessageResponse>('/api/auth/logout', { force }, { baseUrl: envConfig.NEXT_URL, signal })
  },
}

export default authApi
