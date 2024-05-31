import http from '@/lib/http'
import { MeResponse, UpdateMeReqBody } from '@/types/account.type'

const accountApi = {
  // API of backend server
  getMe: (sessionToken: string) =>
    http.get<MeResponse>('/account/me', { headers: { Authorization: `Bearer ${sessionToken}` } }),

  getMeFromClient: (signal?: AbortSignal) => http.get<MeResponse>('/account/me', { signal }),

  updateMeFromClient: (body: UpdateMeReqBody) => http.put<MeResponse>('/account/me', body),
}

export default accountApi
