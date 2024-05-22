'use client'

import { useEffect, useState } from 'react'

import accountApi from '@/api/account.api'
import { GetMeResponse } from '@/types/account.type'
import { useAuthStore } from '@/lib/stores/auth-store'

export default function ProfilePage() {
  const [profile, setProfile] = useState<GetMeResponse['data'] | null>(null)

  const sessionToken = useAuthStore((state) => state.sessionToken)

  useEffect(() => {
    if (sessionToken) {
      ;(async () => {
        const result = await accountApi.getMe(sessionToken)

        setProfile(result.payload.data)
      })()
    }
  }, [sessionToken])

  return <div>{profile?.name}</div>
}
