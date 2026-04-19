import type { MetadataRoute } from 'next';

import { appSettings } from '@/config/app-settings';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/ride', '/drive', '/corporate', '/about'],
        disallow: ['/admin', '/account', '/api'],
      },
    ],
    sitemap: `${appSettings.siteUrl}/sitemap.xml`,
  };
}