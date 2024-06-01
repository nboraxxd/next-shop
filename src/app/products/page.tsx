import Link from 'next/link'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import productApi from '@/api-requests/product.api'
import { DelProductButton } from '@/components/shared'

export default async function ProductsPage() {
  const products = await productApi.getProducts()

  return (
    <div>
      <h1>Product List</h1>
      <div className="space-y-5">
        {products.payload.data.map((product, index) => (
          <div key={product.id} className="flex space-x-4">
            <Image
              src={product.image}
              alt={product.name}
              width={180}
              height={180}
              className="size-32 object-cover"
              priority={index < 7}
            />
            <h3>{product.name}</h3>
            <div>{product.price}</div>
            <div className="flex space-x-2">
              <Button variant={'outline'} asChild>
                <Link href={`/products/${product.id}`}>View</Link>
              </Button>
              <Button variant={'outline'} asChild>
                <Link href={`/products/${product.id}/update`}>Update</Link>
              </Button>

              <DelProductButton productId={product.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
