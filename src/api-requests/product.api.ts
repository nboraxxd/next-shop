import http from '@/lib/http'
import { MessageResponse } from '@/types'
import { AddProductReqBody, ProductResponse, ProductsResponse } from '@/types/product.type'

const productApi = {
  // API of backend server
  getProducts: () => http.get<ProductsResponse>('/products', { cache: 'no-store' }),

  getProduct: (id: number) => http.get<ProductResponse>(`/products/${id}`, { cache: 'no-store' }),

  addProductFromClient: (body: AddProductReqBody) => http.post<ProductResponse>('/products', body),

  updateProductFromClient: (id: number, body: AddProductReqBody) => http.put<ProductResponse>(`/products/${id}`, body),

  deleteProductFromClient: (id: number) => http.delete<MessageResponse>(`/products/${id}`),
}

export default productApi
