import { SuccessResponse } from '@/types'

export type AddProductReqBody = {
  name: string
  description: string
  image: string
  price: number
}

export type Product = {
  id: number
  name: string
  price: number
  description: string
  image: string
  createdAt: string
  updatedAt: string
}

export type ProductsResponse = SuccessResponse<Product[]>

export type ProductResponse = SuccessResponse<Product>
