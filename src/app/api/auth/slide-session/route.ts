import { cookies } from 'next/headers'

import authApi from '@/api-requests/auth.api'
import { HttpError } from '@/lib/http'

export async function POST() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')?.value

  if (!sessionToken) {
    return Response.json({ message: 'Không nhận được session token' }, { status: 401 })
  }

  try {
    const res = await authApi.slideSessionFromNextServerToServer(sessionToken)

    const newExpiryDate = new Date(res.payload.data.expiresAt).toUTCString()

    return Response.json(res.payload, {
      status: 200,
      headers: {
        'Set-Cookie': `sessionToken=${sessionToken}; Path=/; HttpOnly; Secure; SameSite=None; Expires=${newExpiryDate}`,
      },
    })
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, { status: error.status })
    } else {
      return Response.json({ message: 'Đã có lỗi xảy ra' }, { status: 500 })
    }
  }
}
