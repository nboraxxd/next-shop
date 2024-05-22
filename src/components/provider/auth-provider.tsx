'use client'

import { useState } from 'react'

import { clientSessionToken } from '@/lib/http'

interface Props {
  children: React.ReactNode
  initialSessionToken?: string
}

export default function AuthProvider({ children, initialSessionToken = '' }: Props) {
  useState(() => {
    if (typeof window !== 'undefined') {
      clientSessionToken.value = initialSessionToken
    }
  })

  return children
}
