import { GetMeResponse } from '@/types/account.type'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type AuthStore = {
  me: GetMeResponse['data'] | null
  setMe: (user: AuthStore['me']) => void
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      me: null,
      setMe: (me) => set({ me }),
    }),
    { enabled: process.env.NODE_ENV === 'development', name: 'auth-store' }
  )
)
