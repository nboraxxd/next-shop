import productApi from '@/api-requests/product.api'
import { ProductForm } from '@/components/form'
import { Heading } from '@/components/shared'
import { ParamsProps } from '@/types'
import { ProductResponse } from '@/types/product.type'
import { handleErrorApi } from '@/utils/error'

export default async function UpdateProductPage({ params: { id: ProductId } }: ParamsProps) {
  let product: ProductResponse['data'] | null = null

  try {
    const response = await productApi.getProduct(Number(ProductId))
    product = response.payload.data
  } catch (error) {
    handleErrorApi({ error })
  }

  return product ? (
    <div className="container p-4">
      <Heading>Add product to Next free</Heading>
      <div className="mx-auto mt-5 flex w-full max-w-96 flex-col">
        <ProductForm product={product} />
      </div>
    </div>
  ) : (
    <Heading>Không tìm thấy sản phẩm</Heading>
  )
}
