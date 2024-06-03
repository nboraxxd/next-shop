'use client'

import ms from 'ms'
import { useEffect } from 'react'
import { differenceInHours } from 'date-fns'

import authApi from '@/api-requests/auth.api'
import { handleErrorApi } from '@/utils/error'

export default function SlideSession() {
  useEffect(() => {
    const interval = setInterval(async () => {
      const sessionTokenExpiresAt = localStorage.getItem('sessionTokenExpiresAt')
      if (!sessionTokenExpiresAt) return

      const now = new Date()
      const expiresAt = new Date(sessionTokenExpiresAt)

      if (differenceInHours(expiresAt, now) < 1) {
        try {
          const res = await authApi.slideSessionFromNextClientToNextServer()

          localStorage.setItem('sessionTokenExpiresAt', res.payload.data.expiresAt)
        } catch (error) {
          handleErrorApi({ error })
        }
      }
    }, ms('1h'))

    return () => clearInterval(interval)
  }, [])

  return null
}
