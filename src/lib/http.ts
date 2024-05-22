import envConfig from '@/constants/config'
import { AuthResponse } from '@/types/auth.type'

type CustomOptions = RequestInit & { baseUrl?: string }

class HttpError extends Error {
  status: number
  payload: any
  constructor({ status, payload }: { status: number; payload: any }) {
    super('Http Error')
    this.status = status
    this.payload = payload
  }
}

class SessionToken {
  private token = ''

  get value() {
    return this.token
  }

  set value(token: string) {
    if (typeof window === 'undefined') {
      throw new Error('Cannot set token on server side')
    }

    this.token = token
  }
}

export const clientSessionToken = new SessionToken()

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
    throw new HttpError(data)
  }

  if (['/auth/login', '/auth/register'].includes(url)) {
    clientSessionToken.value = (payload as AuthResponse).data.token
  } else if (url === '/auth/logout') {
    clientSessionToken.value = ''
  }

  return data
}

const http = {
  get<Response>(url: string, options?: Omit<CustomOptions, 'body'>) {
    return request<Response>('GET', url, options)
  },
  post<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'>) {
    return request<Response>('POST', url, { ...options, body })
  },
  put<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'>) {
    return request<Response>('PUT', url, { ...options, body })
  },
  delete<Response>(url: string, options?: Omit<CustomOptions, 'body'>) {
    return request<Response>('DELETE', url, options)
  },
}

export default http
