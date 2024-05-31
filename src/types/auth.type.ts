import { Me } from '@/types/account.type'
import { LoginSchemaType, RegisterSchemaType } from '@/lib/schemaValidations/auth.schema'
import { SuccessResponse } from '@/types'

export type RegisterReqBody = RegisterSchemaType

export type LoginReqBody = LoginSchemaType

export type AuthNextServerReqBody = {
  sessionToken: string
  expiresAt: string
}

export type AuthServerResponse = SuccessResponse<{
  token: string
  expiresAt: string
  account: Me
}>

export type AuthNextServerResponse = AuthNextServerReqBody
