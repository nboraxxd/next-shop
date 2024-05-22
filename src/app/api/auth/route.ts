import ms from 'ms'

export async function POST(request: Request) {
  const res = await request.json()

  const sessionToken = res?.data?.token

  if (!sessionToken) {
    return Response.json({ message: 'Không nhận được session token' }, { status: 401 })
  }

  return Response.json(res, {
    status: 200,
    headers: {
      'Set-Cookie': `sessionToken=${sessionToken}; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=${ms('1y') / 1000}`,
    },
  })
}
