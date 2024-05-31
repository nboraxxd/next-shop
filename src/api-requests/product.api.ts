import http from '@/lib/http'
import { AddProductReqBody, ProductResponse, ProductsResponse } from '@/types/product.type'

const productApi = {
  // API of backend server
  getProducts: () => http.get<ProductsResponse>('/products', { cache: 'no-store' }),

  addProductFromClient: (body: AddProductReqBody) => http.post<ProductResponse>('/products', body),
}

export default productApi
