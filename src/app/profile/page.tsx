'use client'

import { useEffect, useState } from 'react'

import accountApi from '@/api/account.api'
import { GetMeResponse } from '@/types/account.type'

export default function ProfilePage() {
  const [profile, setProfile] = useState<GetMeResponse['data'] | null>(null)

  useEffect(() => {
    ;(async () => {
      const result = await accountApi.getMeClient()

      setProfile(result.payload.data)
    })()
  }, [])

  return <div>{profile?.name}</div>
}
