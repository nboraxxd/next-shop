import Image from 'next/image'

import productApi from '@/api-requests/product.api'
import { ParamsProps } from '@/types'
import { ProductResponse } from '@/types/product.type'
import { handleErrorApi } from '@/utils/error'
import { Heading } from '@/components/shared'

export default async function ProductPage({ params: { id: ProductId } }: ParamsProps) {
  let product: ProductResponse['data'] | null = null

  try {
    const response = await productApi.getProduct(Number(ProductId))

    if (response.status === 200) {
      product = response.payload.data
    }
  } catch (error) {
    handleErrorApi({ error })
  }

  return (
    <div>
      {product ? (
        <>
          <Heading>{product.name}</Heading>
          <div className="flex flex-col items-center">
            <Image
              src={product.image}
              alt={product.name}
              width={180}
              height={180}
              priority
              className="size-32 object-cover"
            />
            <div className="mt-3">
              <p>
                Price: <span className="text-lg font-bold">{product.price}</span>
              </p>
              <p>
                Description: <span className="text-lg font-bold">{product.description}</span>
              </p>
            </div>
          </div>
        </>
      ) : (
        <Heading>Không tìm thấy sản phẩm</Heading>
      )}
    </div>
  )
}
