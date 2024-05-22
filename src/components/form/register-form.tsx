'use client'

import { toast } from 'sonner'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'

import authApi from '@/api/auth.api'
import { ServiceStatus } from '@/constants/enum'
import { RegisterSchema, RegisterSchemaType } from '@/lib/schemaValidations/auth.schema'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function RegisterForm() {
  const [status, setStatus] = useState<ServiceStatus>(ServiceStatus.idle)
  const router = useRouter()

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function onValid(values: RegisterSchemaType) {
    if (status === ServiceStatus.pending) return

    setStatus(ServiceStatus.pending)

    try {
      const {
        payload: {
          data: { expiresAt, token: sessionToken },
        },
      } = await authApi.register(values)

      await authApi.authNextServer({ expiresAt, sessionToken })

      setStatus(ServiceStatus.successful)

      form.reset()
      router.push('/')
      router.refresh()
    } catch (error: any) {
      const status = error.status

      if (status === 422) {
        const errors = error.payload?.errors as { field: string; message: string }[]

        errors.forEach(({ field, message }) => {
          form.setError(field as keyof RegisterSchemaType, { message })
        })
      } else {
        toast.error(error.payload?.message || error.toString())
      }

      setStatus(ServiceStatus.rejected)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onValid)} noValidate className="flex w-full flex-col gap-3.5">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Bruce Wayne" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        {/* Confirm password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel>Cofirm password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  autoComplete="new-password"
                  placeholder="Please confirm your password"
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
          Register
        </Button>
      </form>
    </Form>
  )
}
