import { toast } from 'sonner'
import { UseFormSetError } from 'react-hook-form'

import { EntityError } from '@/lib/http'
import { isClient } from '@/utils'

export const handleErrorApi = ({ error, setError }: { error: any; setError?: UseFormSetError<any> }) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach(({ field, message }) => {
      setError(field, { type: 'server', message })
    })
  } else if (error instanceof DOMException) {
    console.log('AbortError:', error.message)
  } else {
    if (isClient) {
      toast.error(error.payload?.message || error.toString())
    } else {
      console.log(error)
    }
  }
}
