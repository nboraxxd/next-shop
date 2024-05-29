import { cookies } from 'next/headers'

import authApi from '@/api-requests/auth.api'
import { HttpError } from '@/lib/http'

export async function POST(request: Request) {
  const body = await request.json()

  const force = body.force as boolean | undefined

  if (force) {
    return Response.json(
      { message: 'Buộc đăng xuất thành công' },
      {
        status: 200,
        headers: {
          'Set-Cookie': `sessionToken=; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=0;`,
        },
      }
    )
  }

  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')?.value

  if (!sessionToken) {
    return Response.json({ message: 'Không nhận được session token' }, { status: 401 })
  }

  try {
    const result = await authApi.logoutFromNextServerToServer(sessionToken)

    if (result.status === 200) {
      return Response.json(
        { message: 'Đăng xuất thành công' },
        {
          status: 200,
          headers: {
            'Set-Cookie': `sessionToken=; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=0;`,
          },
        }
      )
    }
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, { status: error.status })
    } else {
      return Response.json({ message: 'Đã có lỗi xảy ra' }, { status: 500 })
    }
  }
}
