'use client'

import { useRouter } from 'next/navigation'

import authApi from '@/api-requests/auth.api'
import { Button } from '@/components/ui/button'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await authApi.logoutFromNextClientToNextServer()
    } catch (error) {
      await authApi.logoutFromNextClientToNextServer(true)
    } finally {
      router.refresh()
    }
  }

  return (
    <Button onClick={handleLogout} variant={'outline'}>
      Logout
    </Button>
  )
}
