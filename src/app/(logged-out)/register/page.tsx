import { Metadata } from 'next'

import { RedirectAuthLink } from '@/app/(logged-out)/_components'
import { RegisterForm } from '@/components/form'

export const metadata: Metadata = {
  title: 'Register',
  description: 'This is the registration page of the app.',
}

export default function RegisterPage() {
  return (
    <>
      <h1 className="flex items-center gap-2 text-2xl font-semibold">Register with Next free</h1>
      <p>Register to access the best course to learn Next.js</p>

      <div className="mt-5 flex w-full max-w-96 flex-col">
        <RegisterForm />

        <div className="mt-5 flex items-center justify-center gap-1">
          <span>Already have an account?</span>
          <RedirectAuthLink redirectPath="/login">Login</RedirectAuthLink>
        </div>
      </div>
    </>
  )
}
