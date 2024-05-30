import envConfig from '@/constants/config'
import { AuthResponse } from '@/types/auth.type'
import { isClient, addFirstSlashToUrl } from '@/utils'
import { redirect } from 'next/navigation'

type CustomOptions = Omit<RequestInit, 'method'> & {
  baseUrl?: string
  headers?: HeadersInit & { Authorization?: string }
}

type CustomOptionsExcluedBody = Omit<CustomOptions, 'body'>

const ENTITY_ERROR_STATUS = 422
const AUTHENTICATION_ERROR_STATUS = 401

type EntityErrorPayload = {
  message: string
  errors: {
    field: string
    message: string
  }[]
}

export class HttpError extends Error {
  status: number
  payload: {
    message: string
    [key: string]: any
  }

  constructor({ status, payload }: { status: number; payload: any }) {
    super('Http Error')
    this.status = status
    this.payload = payload
  }
}

export class EntityError extends HttpError {
  status: 422 = ENTITY_ERROR_STATUS
  payload: EntityErrorPayload

  constructor(payload: EntityErrorPayload) {
    super({ status: ENTITY_ERROR_STATUS, payload })
    this.payload = payload
  }
}

class SessionToken {
  private token = ''
  private _expiresAt = new Date().toISOString()

  get value() {
    return this.token
  }

  set value(token: string) {
    if (!isClient) {
      throw new Error('Cannot set token on server side')
    }
    this.token = token
  }

  get expiresAt() {
    return this._expiresAt
  }

  set expiresAt(expiresAt: string) {
    if (!isClient) {
      throw new Error('Cannot set expiresAt on server side')
    }
    this._expiresAt = expiresAt
  }
}

export const clientSessionToken = new SessionToken()
let clientLogoutRequest: Promise<any> | null = null

const request = async <Response>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, options?: CustomOptions) => {
  const body = options?.body ? JSON.stringify(options.body) : undefined

  const baseHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: clientSessionToken.value ? `Bearer ${clientSessionToken.value}` : '',
  }

  const baseUrl = options?.baseUrl || envConfig.API_ENDPOINT

  const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
    method,
    body,
  })

  const payload: Response = await res.json()

  const data = {
    status: res.status,
    payload,
  }

  if (!res.ok) {
    if (res.status === ENTITY_ERROR_STATUS) {
      throw new EntityError(data.payload as EntityErrorPayload)
    } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
      if (isClient && !clientLogoutRequest) {
        clientLogoutRequest = fetch('/api/auth/logout', {
          method: 'POST',
          body: JSON.stringify({ force: true }),
          headers: { ...baseHeaders },
        })

        await clientLogoutRequest

        clientLogoutRequest = null
        clientSessionToken.value = ''
        clientSessionToken.expiresAt = new Date().toISOString()

        window.location.href = '/login'
      }

      if (!isClient) {
        const sessionToken = options?.headers?.Authorization?.split('Bearer ')[1]

        redirect(`/logout?sessionToken=${sessionToken}`)
      }
    } else {
      throw new HttpError(data)
    }
  }

  if (isClient && ['/auth/login', '/auth/register'].some((path) => path === addFirstSlashToUrl(url))) {
    clientSessionToken.value = (payload as AuthResponse).data.token
    clientSessionToken.expiresAt = (payload as AuthResponse).data.expiresAt
  } else if (isClient && addFirstSlashToUrl(url) === '/auth/logout') {
    clientSessionToken.value = ''
    clientSessionToken.expiresAt = new Date().toISOString()
  }

  return data
}

const http = {
  get<Response>(url: string, options?: CustomOptionsExcluedBody) {
    return request<Response>('GET', url, options)
  },
  post<Response>(url: string, body: any, options?: CustomOptionsExcluedBody) {
    return request<Response>('POST', url, { ...options, body })
  },
  put<Response>(url: string, body: any, options?: CustomOptionsExcluedBody) {
    return request<Response>('PUT', url, { ...options, body })
  },
  delete<Response>(url: string, options?: CustomOptionsExcluedBody) {
    return request<Response>('DELETE', url, options)
  },
}

export default http
