import { cache } from 'react'
import { Metadata } from 'next'

import productApi from '@/api-requests/product.api'
import { ParamsProps } from '@/types'
import { ProductResponse } from '@/types/product.type'
import { handleErrorApi } from '@/utils/error'
import { ProductForm } from '@/components/form'
import { Heading } from '@/components/shared'

const getProduct = cache(productApi.getProduct)

export async function generateMetadata({ params }: ParamsProps): Promise<Metadata> {
  // read route params
  const productId = params.id

  // fetch data
  const productResponse = await getProduct(Number(productId))

  return {
    title: `Edit ${productResponse.payload.data.name}`,
    description: productResponse.payload.data.description,
  }
}

export default async function EditProductPage({ params: { id: productId } }: ParamsProps) {
  let product: ProductResponse['data'] | null = null

  try {
    const response = await getProduct(Number(productId))
    product = response.payload.data
  } catch (error) {
    handleErrorApi({ error })
  }

  return product ? (
    <div className="container p-4">
      <Heading>Edit {product.name} to Next free</Heading>
      <div className="mx-auto mt-5 flex w-full max-w-96 flex-col">
        <ProductForm product={product} />
      </div>
    </div>
  ) : (
    <Heading>Không tìm thấy sản phẩm</Heading>
  )
}
