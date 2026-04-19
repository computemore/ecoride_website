import type { Metadata } from 'next';

import { appSettings } from '@/config/app-settings';
import type { SeoProps } from '@/types';

export const buildMetadata = ({ title, description, canonical, ogImage, keywords }: SeoProps): Metadata => {
  const resolvedUrl = new URL(canonical, appSettings.siteUrl);
  const imageUrl = new URL(ogImage, appSettings.siteUrl);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: resolvedUrl,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: resolvedUrl,
      siteName: appSettings.siteName,
      images: [
        {
          url: imageUrl,
          width: 256,
          height: 256,
          alt: `${appSettings.siteName} logo`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
};