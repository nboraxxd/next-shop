'use client'

import { useEffect } from 'react'

import { GetMeResponse } from '@/types/account.type'
import { useAuthStore } from '@/lib/stores/auth-store'
import { clientSessionToken } from '@/lib/http'
import { isClient } from '@/utils'

interface Props {
  children: React.ReactNode
  me: GetMeResponse['data'] | null
  initialSessionToken?: string
}

export default function AuthProvider({ children, me, initialSessionToken = '' }: Props) {
  const setMe = useAuthStore((state) => state.setMe)

  useEffect(() => {
    if (isClient) {
      clientSessionToken.value = initialSessionToken

      setMe(me)
    }
  }, [initialSessionToken, me, setMe])

  return children
}
