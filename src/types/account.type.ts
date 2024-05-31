import { SuccessResponse } from '@/types'

export type Me = {
  id: number
  name: string
  email: string
}

export type UpdateMeReqBody = {
  name: string
}

export type MeResponse = SuccessResponse<Me>
