'use client'

import { useEffect, useState } from 'react'

import accountApi from '@/api-requests/account.api'
import { GetMeResponse } from '@/types/account.type'
import { handleErrorApi } from '@/utils/error'

export default function ProfilePage() {
  const [profile, setProfile] = useState<GetMeResponse['data'] | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const result = await accountApi.getMeClient()

        setProfile(result.payload.data)
      } catch (error) {
        handleErrorApi({ error })
      }
    })()
  }, [])

  return <div>{profile?.name}</div>
}
