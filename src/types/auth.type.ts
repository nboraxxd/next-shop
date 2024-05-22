import { LoginSchemaType, RegisterSchemaType } from '@/lib/schemaValidations/auth.schema'

export type RegisterReqBody = RegisterSchemaType

export type LoginReqBody = LoginSchemaType

export type AuthNextServerReqBody = {
  sessionToken: string
  expiresAt: string
}

export type AuthResponse = {
  data: {
    token: string
    expiresAt: string
    account: {
      id: number
      name: string
      email: string
    }
  }
  message: string
}

export type AuthNextServerResponse = AuthNextServerReqBody
