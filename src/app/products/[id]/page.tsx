import Image from 'next/image'
import { cache } from 'react'
import { Metadata } from 'next'

import envConfig from '@/constants/config'
import productApi from '@/api-requests/product.api'
import { ParamsProps } from '@/types'
import { ProductResponse } from '@/types/product.type'
import { handleErrorApi } from '@/utils/error'
import { baseOpenGraph } from '@/constants/shared-metadata'
import { Heading } from '@/components/shared'

const getProduct = cache(productApi.getProduct)

export async function generateMetadata({ params }: ParamsProps): Promise<Metadata> {
  const productResponse = await getProduct(Number(params.id))

  const url = `${envConfig.NEXT_URL}/products/${params.id}`
  const title = productResponse.payload.data.name
  const description = productResponse.payload.data.description
  const image = productResponse.payload.data.image

  return {
    title,
    description,
    openGraph: {
      ...baseOpenGraph,
      title,
      description,
      url,
      images: [{ url: image, alt: title }],
    },
    alternates: {
      canonical: url,
    },
  }
}

export default async function ProductDetailPage({ params: { id: productId } }: ParamsProps) {
  let product: ProductResponse['data'] | null = null

  try {
    const response = await getProduct(Number(productId))

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
          <div className="mt-4 flex flex-col items-center">
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
                ID: <span className="text-lg font-bold">{product.id}</span>
              </p>
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
