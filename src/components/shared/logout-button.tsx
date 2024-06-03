'use client'

import { useRouter } from 'next/navigation'

import authApi from '@/api-requests/auth.api'
import { useAuthStore } from '@/lib/stores/auth-store'
import { Button } from '@/components/ui/button'

export default function LogoutButton() {
  const setMe = useAuthStore((state) => state.setMe)

  const router = useRouter()

  const handleLogout = async () => {
    try {
      await authApi.logoutFromNextClientToNextServer()
    } catch (error) {
      await authApi.logoutFromNextClientToNextServer(true)
    } finally {
      setMe(null)
      localStorage.removeItem('sessionToken')
      localStorage.removeItem('sessionTokenExpiresAt')
      router.refresh()
    }
  }

  return (
    <Button onClick={handleLogout} variant={'outline'}>
      Logout
    </Button>
  )
}
