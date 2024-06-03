'use client'

import { toast } from 'sonner'
import queryString from 'query-string'
import { Suspense, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import authApi from '@/api-requests/auth.api'
import { handleErrorApi } from '@/utils/error'
import { useAuthStore } from '@/lib/stores/auth-store'

function LogoutLogic() {
  const setMe = useAuthStore((state) => state.setMe)

  const router = useRouter()

  const pathname = usePathname()
  const from = queryString.stringify({ from: pathname })

  const searchParams = useSearchParams()
  const sessionToken = searchParams.get('sessionToken')

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    if (sessionToken === localStorage.getItem('sessionToken')) {
      ;(async () => {
        try {
          await authApi.logoutFromNextClientToNextServer(true, signal)

          setMe(null)
          router.push(`/login?${from}`)
        } catch (error) {
          handleErrorApi({ error })
        }
      })()
    } else {
      toast.warning('Invalid session token')
      router.push(`/`)
    }

    return () => {
      controller.abort()
    }
  }, [from, router, sessionToken, setMe])

  return null
}

export default function LogoutPage() {
  return (
    <Suspense>
      <LogoutLogic />
    </Suspense>
  )
}
