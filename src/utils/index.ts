export const isClient = typeof window !== 'undefined'

export const addFirstSlashToUrl = (url: string) => {
  return url.startsWith('/') ? url : `/${url}`
}
