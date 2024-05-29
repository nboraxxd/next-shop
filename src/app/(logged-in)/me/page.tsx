import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import accountApi from '@/api-requests/account.api'

export default async function MePage() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')

  if (!sessionToken) redirect('/login')

  const result = await accountApi.getMe(sessionToken.value)

  return <div>Hello {result.payload.data.name} (server)</div>
}
