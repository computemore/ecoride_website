import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import type { Organization, WebSite, WithContext } from 'schema-dts';

import { StructuredData } from '@/components/widgets/structured-data';
import { appSettings } from '@/config/app-settings';
import '@/styles/main.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-inter',
});

const organizationSchema: WithContext<Organization> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: appSettings.siteName,
  url: appSettings.siteUrl,
  email: appSettings.supportEmail,
  telephone: appSettings.phoneNumbers[0],
  address: {
    '@type': 'PostalAddress',
    streetAddress: appSettings.addressLines.join(', '),
    addressCountry: 'MW',
  },
};

const websiteSchema: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: appSettings.siteName,
  url: appSettings.siteUrl,
};

// site meta tags and favicons go in here
export const metadata: Metadata = {
  metadataBase: new URL(appSettings.siteUrl),
  title: {
    default: 'Ecoride Malawi',
    template: '%s | Ecoride Malawi',
  },
  description: 'Local-first ride sharing, car hire, and corporate transport messaging for Malawi.',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon-180.png',
    shortcut: '/favicon-64.png',
    other: [
      { rel: 'icon', url: '/favicon-32.png', sizes: '32x32' },
      { rel: 'icon', url: '/favicon-16.png', sizes: '16x16' },
    ],
  },
  // meta keywords
  keywords: [
    'Ride sharing Malawi', 
    'Ride-sharing Malawi',
    'ride sharing Malawi',
    'ride-sharing Malawi',
    'Taxi Blantyre', 
    'Taxi Malawi',
    'taxi blantyre',
    'Taxi nearby',
    'Taxi Lilongwe', 
    'taxi malawi',
    'taxi nearby',
    'Transport Malawi', 
    'Corporate transport',
    'Corporate taxi',
    'Corporate rides',
    'Driver nearby',
    'driver nearby',
    'EcoRide', 
    'ecoRide',
    'Eco-Ride', 
    'eco-Ride',
    'Eco-Ride Malawi',
    'Eco-Ride near me', 
    'Eco-Ride nearby',
    'Eco-Ride near-by', 
    'Eco-Ride Blantyre',
    'Eco-Ride Lilongwe', 
    'EcoRide Malawi',
    'EcoRide near me', 
    'EcoRide nearby',
    'EcoRide near-by', 
    'EcoRide Blantyre',
    'EcoRide Lilongwe',
    'Ecoride Malawi',
    'Ecoride near me', 
    'Ecoride nearby',
    'Ecoride near-by', 
    'Ecoride Blantyre',
    'Ecoride Lilongwe',  
    'ecoride Malawi',
    'ecoride near me', 
    'ecoride nearby',
    'ecoride near-by', 
    'ecoride Blantyre',
    'ecoride Lilongwe',  
    'eco-ride Malawi',
    'eco-ride near me', 
    'eco-ride nearby',
    'eco-ride near-by', 
    'eco-ride Blantyre',
    'eco-ride Lilongwe',  
    'Car hire nearby',     
    'Car-hire nearby',     
    'Car hire Malawi',     
    'Car-hire Malawi',
    'Car hire Lilongwe', 
    'Car-hire Lilongwe', 
    'Car hire Blantyre', 
    'Car-hire Blantyre', 
    'car hire nearby',     
    'car-hire nearby',     
    'car hire Malawi',     
    'car-hire Malawi',
    'car hire Lilongwe', 
    'car-hire Lilongwe', 
    'car hire Blantyre', 
    'car-hire Blantyre'
  ],
  // OpenGraph (Facebook, LinkedIn, iMessage previews)
  openGraph: {
    type: 'website',
    locale: 'en_MW',
    url: appSettings.siteUrl,
    siteName: 'Ecoride Malawi',
    title: 'Ecoride Malawi - A Ride simplified',
    description: 'Local-first ride sharing, car hire, and corporate transport messaging for Malawi',
    images: [
      {
        // Add an image (like a banner) to your public folder
        url: '/original-banner.png', 
        width: 1200,
        height: 630,
        alt: 'Ecoride Malawi Preview Image',
      },
    ],
  },
  // twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Ecoride Malawi - A Ride simplified',
    description: 'Local-first ride sharing, car hire, and corporate transport messaging for Malawi',
    images: ['/original-banner.png'],
    creator: '@ecoridemw', // Replace with actual handle if you have one
  },
  // indexing rules important for crawlers and SEO, can be adjusted per page with next/head if needed
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// viewport that paints the background must be flexible, no bg color hardcoded
export const viewport: Viewport = {
  themeColor: 'var(--page-color)',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  // return this jsx, rm bg-brand-red to prevent red paint
  return (
    <html className={inter.variable} lang="en">
      <body className="min-h-screen bg-[var(--page-color)] text-white antialiased">
        <StructuredData data={organizationSchema} />
        <StructuredData data={websiteSchema} />
        {children}
      </body>
    </html>
  );
}