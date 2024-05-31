import { ProductForm } from '@/components/form'
import { Heading } from '@/components/shared'

export default function AddProductPage() {
  return (
    <div className="container p-4">
      <Heading>Add product to Next free</Heading>
      <div className="mx-auto mt-5 flex w-full max-w-96 flex-col">
        <ProductForm />
      </div>
    </div>
  )
}
