import Link from 'next/link'

import { VercelLogoIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'

export default async function HomePage() {
  return (
    <>
      <h1 className="flex items-center gap-2 text-2xl font-semibold">
        <VercelLogoIcon className="size-10 text-pink-500" />
        Next free
      </h1>
      <p>You are not logged in</p>

      <div className="flex items-center gap-2">
        <Button asChild>
          <Link href="/login">Log in</Link>
        </Button>
        <small>or</small>
        <Button variant="outline">
          <Link href="/register">Register</Link>
        </Button>
      </div>

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
