import type { MetadataRoute } from 'next';

import { appSettings } from '@/config/app-settings';

const routes = ['', '/ride', '/drive', '/corporate', '/about', '/about/terms', '/about/privacy-policy', '/ecoride-user/delete-me', '/login-coming-soon'];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${appSettings.siteUrl}${route}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}