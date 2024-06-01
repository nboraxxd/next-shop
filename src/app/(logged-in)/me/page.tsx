import Link from 'next/link'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import accountApi from '@/api-requests/account.api'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Me',
  description: 'This is the me page of the app.',
}

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
