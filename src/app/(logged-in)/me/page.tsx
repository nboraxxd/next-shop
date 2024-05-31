import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import accountApi from '@/api-requests/account.api'
import { Button } from '@/components/ui/button'

export default async function MePage() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')

  if (!sessionToken) redirect('/login')

  const result = await accountApi.getMe(sessionToken.value)

  return (
    <div>
      <h1>Hello {result.payload.data.name} (server)</h1>
      <Button asChild>
        <Link href="/me/update">Update me</Link>
      </Button>
    </div>
  )
}
