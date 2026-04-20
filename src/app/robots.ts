import type { MetadataRoute } from 'next';

import { appSettings } from '@/config/app-settings';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/ride', '/drive', '/corporate', '/about', '/about/terms', '/about/privacy-policy'],
        disallow: ['/admin', '/account', '/api'],
      },
    ],
    sitemap: `${appSettings.siteUrl}/sitemap.xml`,
  };
}