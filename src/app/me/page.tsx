import { cookies } from 'next/headers'

import envConfig from '@/constants/config'

export default async function MePage() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')
  console.log('🔥 ~ MePage ~ sessionToken:', sessionToken)

  const result = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionToken?.value}`,
    },
  }).then(async (res) => {
    const payload = await res.json()

    const data = { status: res.status, payload }

    if (!res.ok) throw data

    return data
  })
  console.log('🔥 ~ MePage ~ result:', result)

  return <div>Hello {result.payload?.data?.name}</div>
}
