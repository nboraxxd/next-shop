import http from '@/lib/http'
import { GetMeResponse, UpdateMeReqBody } from '@/types/account.type'

const accountApi = {
  // API of backend server
  getMe: (sessionToken: string) =>
    http.get<GetMeResponse>('/account/me', { headers: { Authorization: `Bearer ${sessionToken}` } }),

  getMeFromClient: (signal?: AbortSignal) => http.get<GetMeResponse>('/account/me', { signal }),

  updateMeFromClient: (body: UpdateMeReqBody) => http.put<GetMeResponse>('/account/me', body),
}

export default accountApi
