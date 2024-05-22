import http from '@/lib/http'
import envConfig from '@/constants/config'
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

  // API from Next.js server
  authNextServer: (body: AuthNextServerReqBody) =>
    http.post<AuthNextServerResponse>('/api/auth', body, { baseUrl: envConfig.NEXT_URL }),
}

export default authApi
