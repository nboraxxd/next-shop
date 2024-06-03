import envConfig from '@/constants/config'
import { AuthServerResponse } from '@/types/auth.type'
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

let clientLogoutRequest: Promise<any> | null = null

const request = async <Response>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, options?: CustomOptions) => {
  const body = options?.body instanceof FormData ? options.body : JSON.stringify(options?.body)

  const baseHeaders: HeadersInit = options?.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }

  const baseUrl = options?.baseUrl || envConfig.API_ENDPOINT

  const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`

  if (isClient) {
    const sessionToken = localStorage.getItem('sessionToken')

    if (sessionToken) {
      baseHeaders.Authorization = `Bearer ${sessionToken}`
    }
  }

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

        try {
          await clientLogoutRequest
        } catch (error) {
          console.log('😰 clientLogoutRequest', error)
        } finally {
          localStorage.removeItem('sessionToken')
          localStorage.removeItem('sessionTokenExpiresAt')
          clientLogoutRequest = null
          window.location.href = '/login'
        }
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
    const { token, expiresAt } = (payload as AuthServerResponse).data

    localStorage.setItem('sessionToken', token)
    localStorage.setItem('sessionTokenExpiresAt', expiresAt)
  } else if (isClient && addFirstSlashToUrl(url) === '/auth/logout') {
    localStorage.removeItem('sessionToken')
    localStorage.removeItem('sessionTokenExpiresAt')
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
