import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

import accountApi from '@/api-requests/account.api'
import { UpdateMeForm } from '@/components/form'
import { Heading } from '@/components/shared'

export default async function UpdateMe() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')

  if (!sessionToken) redirect('/login')

  const result = await accountApi.getMe(sessionToken.value)

  return (
    <div className="container p-4">
      <Heading>Update Me {result.payload.data.name}</Heading>

      <div className="mx-auto mt-5 flex w-full max-w-96 flex-col">
        <UpdateMeForm />
      </div>
    </div>
  )
}
