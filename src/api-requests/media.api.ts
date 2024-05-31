import http from '@/lib/http'
import { UploadImageResponse } from '@/types/media.type'

const mediaApi = {
  // API of backend server
  uploadImage: (body: FormData) => http.post<UploadImageResponse>('/media/upload', body),
}

export default mediaApi
