'use client'

import ms from 'ms'
import { useEffect } from 'react'
import { differenceInHours } from 'date-fns'

import authApi from '@/api-requests/auth.api'
import { clientSessionToken } from '@/lib/http'
import { handleErrorApi } from '@/utils/error'

export default function SlideSession() {
  useEffect(() => {
    const interval = setInterval(async () => {
      const now = new Date()
      const expiresAt = new Date(clientSessionToken.expiresAt)

      if (differenceInHours(expiresAt, now) < 1) {
        try {
          const res = await authApi.slideSessionFromNextClientToNextServer()

          clientSessionToken.expiresAt = res.payload.data.expiresAt
        } catch (error) {
          handleErrorApi({ error })
        }
      }
    }, ms('1h'))

    return () => clearInterval(interval)
  }, [])

  return null
}
