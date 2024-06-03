'use client'

import { useEffect } from 'react'

import { MeResponse } from '@/types/account.type'
import { useAuthStore } from '@/lib/stores/auth-store'
import { isClient } from '@/utils'

interface Props {
  children: React.ReactNode
  me: MeResponse['data'] | null
}

export default function AuthProvider({ children, me }: Props) {
  const setMe = useAuthStore((state) => state.setMe)

  useEffect(() => {
    if (isClient) {
      setMe(me)
    }
  }, [me, setMe])

  return children
}
