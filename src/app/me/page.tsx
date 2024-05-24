import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import accountApi from '@/api-requests/account.api'
import { handleErrorApi } from '@/utils/error'

export default async function MePage() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')?.value

  if (!sessionToken) redirect('/login')

  let result
  try {
    result = await accountApi.getMe('sessionToken')
  } catch (error) {
    handleErrorApi({ error })
  }

  return <div>Hello {result?.payload.data.name}</div>
}
