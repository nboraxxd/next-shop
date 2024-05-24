import Link from 'next/link'
import { cookies } from 'next/headers'

import { Button } from '@/components/ui/button'
import { VercelLogoIcon } from '@radix-ui/react-icons'
import ButtonLogout from '@/components/shared/button-logout'

export default async function HomePage() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')?.value

  return (
    <>
      <h1 className="flex items-center gap-2 text-2xl font-semibold">
        <VercelLogoIcon className="size-10 text-pink-500" />
        Next free
      </h1>
      <p>You are not logged in</p>

      {!sessionToken ? (
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/login">Log in</Link>
          </Button>
          <small>or</small>
          <Button variant="outline">
            <Link href="/register">Register</Link>
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/me">Me (server)</Link>
          </Button>
          <Button asChild>
            <Link href="/profile">Profile (client)</Link>
          </Button>
          <ButtonLogout />
        </div>
      )}

      <div className="flex items-center gap-2">
        <Button asChild>
          <Link href="/products">Products</Link>
        </Button>
        <Button asChild>
          <Link href="/products/add">Add product</Link>
        </Button>
      </div>
    </>
  )
}
