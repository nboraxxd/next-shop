import { AuthNextServerReqBody } from '@/types/auth.type'

export async function POST(request: Request) {
  const body: AuthNextServerReqBody = await request.json()

  const { expiresAt, sessionToken } = body

  if (!sessionToken) {
    return Response.json({ message: 'Không nhận được session token' }, { status: 401 })
  }

  const expiryDate = new Date(expiresAt).toUTCString()

  return Response.json(body, {
    status: 200,
    headers: {
      'Set-Cookie': `sessionToken=${sessionToken}; Path=/; HttpOnly; Secure; SameSite=None; Expires=${expiryDate}`,
    },
  })
}
