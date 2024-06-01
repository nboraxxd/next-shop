import envConfig from '@/constants/config'
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/me/'],
    },
    sitemap: `${envConfig.NEXT_URL}/sitemap.xml`,
  }
}
