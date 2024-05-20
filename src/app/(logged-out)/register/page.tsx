import Link from 'next/link'

import RegisterForm from '@/components/form/register-form'

export default function RegisterPage() {
  return (
    <>
      <h1 className="flex items-center gap-2 text-2xl font-semibold">Register with Next free</h1>
      <p>Register to access the best course to learn Next.js</p>

      <div className="mt-5 flex w-full max-w-96 flex-col">
        <RegisterForm />

        <div className="mt-4 flex items-center justify-center gap-1">
          <span>Already have an account?</span>
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </>
  )
}
