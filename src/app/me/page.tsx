import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import accountApi from '@/api/account.api'

export default async function MePage() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')?.value

  if (!sessionToken) redirect('/login')

  const result = await accountApi.getMe(sessionToken)

  return <div>Hello {result.payload.data.name}</div>
}
