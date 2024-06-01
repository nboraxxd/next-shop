'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import mediaApi from '@/api-requests/media.api'
import productApi from '@/api-requests/product.api'
import { AddProductSchema, AddProductSchemaType } from '@/lib/schemaValidations/product.schema'
import { ProductResponse } from '@/types/product.type'
import { handleErrorApi } from '@/utils/error'
import { ServiceStatus } from '@/constants/enum'
import envConfig from '@/constants/config'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

export default function ProductForm({ product }: { product?: ProductResponse['data'] }) {
  const [status, setStatus] = useState<ServiceStatus>(ServiceStatus.idle)
  const [file, setFile] = useState<File | null>(null)
  const inputImageRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const form = useForm<AddProductSchemaType>({
    resolver: zodResolver(AddProductSchema),
    defaultValues: {
      name: product?.name ?? '',
      price: product?.price ?? 0,
      description: product?.description ?? '',
      image: product?.image ?? undefined,
    },
  })

  const image = form.watch('image')

  async function onSubmit(values: AddProductSchemaType) {
    if (status === ServiceStatus.pending) return

    try {
      setStatus(ServiceStatus.pending)

      const formData = new FormData()
      formData.append('file', file as Blob)

      if (product) {
        const uploadImageResponse = file ? await mediaApi.uploadImage(formData) : undefined

        await productApi.updateProductFromClient(product.id, {
          ...values,
          image: uploadImageResponse?.payload.data || product.image,
        })
      } else {
        const uploadImageResponse = await mediaApi.uploadImage(formData)

        await productApi.addProductFromClient({ ...values, image: uploadImageResponse.payload.data })
      }

      router.push('/products')
      router.refresh()

      setStatus(ServiceStatus.successful)
    } catch (error) {
      setStatus(ServiceStatus.rejected)
      handleErrorApi({ error, setError: form.setError })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="flex w-full flex-col gap-3.5">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Product name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Product price" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Product description" className="resize-y" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  placeholder="Product image"
                  type="file"
                  accept="image/*"
                  ref={inputImageRef}
                  onChange={(event) => {
                    const _file = event.target.files?.[0]
                    if (_file) {
                      setFile(_file)
                      field.onChange(`${envConfig.NEXT_URL}/${_file.name}`)
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image preview */}
        {file || image ? (
          <div className="flex flex-col items-center">
            <Image
              src={file ? URL.createObjectURL(file) : image}
              width={128}
              height={128}
              quality={90}
              alt="preview"
              className="size-32 object-cover"
              priority={!!product}
            />
            <Button
              type="button"
              variant={'destructive'}
              size={'sm'}
              className="mt-2 w-fit"
              onClick={() => {
                setFile(null)
                form.setValue('image', '')
                if (inputImageRef.current) {
                  inputImageRef.current.value = ''
                }
              }}
            >
              Xóa hình ảnh
            </Button>
          </div>
        ) : null}

        {/* Button */}
        <Button type="submit" disabled={status === ServiceStatus.pending} className="mt-2">
          {product ? 'Update' : 'Add'}
        </Button>
      </form>
    </Form>
  )
}
