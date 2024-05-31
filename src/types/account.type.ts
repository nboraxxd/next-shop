export type UpdateMeReqBody = {
  name: string
}

export type GetMeResponse = {
  data: {
    id: number
    name: string
    email: string
  }
  message: string
}
