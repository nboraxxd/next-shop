'use client'

import { useEffect, useState } from 'react'

import { useAuthStore } from '@/lib/stores/auth-store'
import envConfig from '@/constants/config'

export default function ProfilePage() {
  const [profile, setProfile] = useState<{
    status: number
    payload: any
  } | null>(null)

  const sessionToken = useAuthStore((state) => state.sessionToken)

  useEffect(() => {
    if (sessionToken) {
      ;(async () => {
        const result = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`, {
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        }).then(async (res) => {
          const payload = await res.json()
          const data = {
            status: res.status,
            payload,
          }

          if (!res.ok) {
            throw data
          }

          return data
        })

        setProfile(result)
      })()
    }
  }, [sessionToken])

  return <div>{profile?.payload.data.name}</div>
}
