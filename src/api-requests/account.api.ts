import http from '@/lib/http'
import { GetMeResponse } from '@/types/account.type'

const accountApi = {
  getMe: (sessionToken: string) =>
    http.get<GetMeResponse>('/account/me', { headers: { Authorization: `Bearer ${sessionToken}` } }),

  getMeClient: (signal?: AbortSignal) => http.get<GetMeResponse>('/account/me', { signal }),
}

export default accountApi
