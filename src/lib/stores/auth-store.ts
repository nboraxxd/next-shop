import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type AuthStore = {
  sessionToken: string
  setSessionToken: (sessionToken: string) => void
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      sessionToken: '',
      setSessionToken: (sessionToken) => set({ sessionToken }),
    }),
    { enabled: process.env.NODE_ENV === 'development', name: 'auth-store' }
  )
)
