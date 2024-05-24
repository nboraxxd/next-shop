'use client'

import { useState } from 'react'

import { isClient } from '@/utils'
import { clientSessionToken } from '@/lib/http'

interface Props {
  children: React.ReactNode
  initialSessionToken?: string
}

export default function AuthProvider({ children, initialSessionToken = '' }: Props) {
  useState(() => {
    if (isClient) {
      clientSessionToken.value = initialSessionToken
    }
  })

  return children
}
