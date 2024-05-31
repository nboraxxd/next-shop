import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

import accountApi from '@/api-requests/account.api'
import { UpdateMeForm } from '@/components/form'

export default async function UpdateMe() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')

  if (!sessionToken) redirect('/login')

  const result = await accountApi.getMe(sessionToken.value)
  console.log('🔥 ~ UpdateMe ~ result:', result)

  return (
    <div>
      <h1>Update Me {result.payload.data.name}</h1>

      <UpdateMeForm />
    </div>
  )
}
