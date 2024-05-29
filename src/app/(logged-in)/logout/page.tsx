'use client'

import { useEffect } from 'react'
import queryString from 'query-string'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import authApi from '@/api-requests/auth.api'
import { clientSessionToken } from '@/lib/http'
import { handleErrorApi } from '@/utils/error'

export default function LogoutPage() {
  const router = useRouter()

  const pathname = usePathname()
  const from = queryString.stringify({ from: pathname })

  const searchParams = useSearchParams()
  const sessionToken = searchParams.get('sessionToken')

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    ;(async () => {
      try {
        if (sessionToken === clientSessionToken.value) {
          await authApi.logoutFromNextClientToNextServer(true, signal)
          router.push(`/login?${from}`)
        }
      } catch (error) {
        handleErrorApi({ error })
      }
    })()

    return () => {
      controller.abort()
    }
  }, [from, router, sessionToken])
}
