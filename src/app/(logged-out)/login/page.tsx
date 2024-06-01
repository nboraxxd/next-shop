import Link from 'next/link'
import { Metadata } from 'next'

import { SearchParamsProps } from '@/types'
import LoginForm from '@/components/form/login-form'

export const metadata: Metadata = {
  title: 'Login',
  description: 'This is the login page of the app.',
}

export default function LoginPage({ searchParams }: SearchParamsProps) {
  return (
    <>
      <h1 className="flex items-center gap-2 text-2xl font-semibold">Login to Next free</h1>
      <p>Welcome back! Please login to your account.</p>

      <div className="mt-5 flex w-full max-w-96 flex-col">
        <LoginForm />

        <div className="mt-5 flex items-center justify-center gap-1">
          <span>Don&apos;t have an account?</span>
          <Link
            href={{
              pathname: '/register',
              query: searchParams,
            }}
            className="text-blue-600 hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </>
  )
}
