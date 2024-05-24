'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import authApi from '@/api-requests/auth.api'
import { handleErrorApi } from '@/utils/error'

export default function ButtonLogout() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await authApi.logoutFromNextClientToNextServer()
      router.refresh()
    } catch (error) {
      handleErrorApi({ error })
    }
  }

  return (
    <Button onClick={handleLogout} variant={'outline'}>
      Logout
    </Button>
  )
}
