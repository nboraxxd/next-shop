'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'

import authApi from '@/api-requests/auth.api'
import { ServiceStatus } from '@/constants/enum'
import { handleErrorApi } from '@/utils/error'
import { LoginSchemaType, LoginSchema } from '@/lib/schemaValidations/auth.schema'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function LoginForm() {
  const [status, setStatus] = useState<ServiceStatus>(ServiceStatus.idle)
  const router = useRouter()

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onValid(values: LoginSchemaType) {
    if (status === ServiceStatus.pending) return

    setStatus(ServiceStatus.pending)

    try {
      const {
        payload: {
          data: { token: sessionToken, expiresAt },
        },
      } = await authApi.login(values)

      await authApi.authNextServer({ sessionToken, expiresAt })

      setStatus(ServiceStatus.successful)

      form.reset()
      router.push('/')
      router.refresh()
    } catch (error) {
      handleErrorApi({ error, setError: form.setError })
      setStatus(ServiceStatus.rejected)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onValid)} noValidate className="flex w-full flex-col gap-3.5">
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" autoComplete="email" placeholder="bruce@wayne.dc" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  autoComplete="new-password"
                  placeholder="Please enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Button */}
        <Button type="submit" disabled={status === ServiceStatus.pending} className="mt-2 gap-2">
          {status === ServiceStatus.pending ? <LoaderCircle className="ml-2 animate-spin" /> : null}
          Login
        </Button>
      </form>
    </Form>
  )
}
