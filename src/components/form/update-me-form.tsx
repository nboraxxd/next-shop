'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import accountApi from '@/api-requests/account.api'
import { UpdateMeSchema, UpdateMeSchemaType } from '@/lib/schemaValidations/account.schema'
import { handleErrorApi } from '@/utils/error'
import { ServiceStatus } from '@/constants/enum'
import { useAuthStore } from '@/lib/stores/auth-store'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

export default function UpdateMeForm() {
  const [status, setStatus] = useState<ServiceStatus>(ServiceStatus.idle)

  const router = useRouter()

  const me = useAuthStore((state) => state.me)
  const setMe = useAuthStore((state) => state.setMe)

  const form = useForm<UpdateMeSchemaType>({
    resolver: zodResolver(UpdateMeSchema),
    defaultValues: {
      name: me?.name ?? '',
    },
  })

  useEffect(() => {
    form.setValue('name', me?.name ?? '')
  }, [form, me?.name])

  async function onValid(data: UpdateMeSchemaType) {
    try {
      setStatus(ServiceStatus.pending)
      const res = await accountApi.updateMeFromClient(data)

      if (res.status === 200) {
        router.refresh()
        setStatus(ServiceStatus.successful)
        setMe(res.payload.data)
      }
    } catch (error) {
      setStatus(ServiceStatus.rejected)
      handleErrorApi({ error })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onValid)} noValidate className="flex w-full flex-col gap-3.5">
        {/* Email */}
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="email" autoComplete="name" placeholder="bruce@wayne.dc" value={me?.email || ''} readOnly />
        </FormControl>

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" autoComplete="name" placeholder="Bruce Wayne" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Button */}
        <Button type="submit" disabled={status === ServiceStatus.pending} className="mt-2 w-fit">
          Submit
        </Button>
      </form>
    </Form>
  )
}
