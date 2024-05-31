'use client'

import { useEffect, useState } from 'react'

import accountApi from '@/api-requests/account.api'
import { GetMeResponse } from '@/types/account.type'
import { handleErrorApi } from '@/utils/error'

export default function ProfilePage() {
  const [profile, setProfile] = useState<GetMeResponse['data'] | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    ;(async () => {
      try {
        const result = await accountApi.getMeFromClient(signal)

        setProfile(result.payload.data)
      } catch (error) {
        handleErrorApi({ error })
      }
    })()

    return () => {
      controller.abort()
    }
  }, [])

  return <div>Hello {profile?.name} (client)</div>
}
