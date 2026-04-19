import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import type { Organization, WebSite, WithContext } from 'schema-dts';

import { StructuredData } from '@/components/widgets/structured-data';
import { appSettings } from '@/config/app-settings';
import '@/styles/main.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins',
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

export const metadata: Metadata = {
  metadataBase: new URL(appSettings.siteUrl),
  title: {
    default: 'Ecoride Malawi',
    template: '%s | Ecoride Malawi',
  },
  description: 'Local-first ride sharing, car hire, and corporate transport messaging for Malawi.',
};

export const viewport: Viewport = {
  themeColor: '#f0453d',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html className={poppins.variable} lang="en">
      <body className="min-h-screen bg-brand-red text-white antialiased">
        <StructuredData data={organizationSchema} />
        <StructuredData data={websiteSchema} />
        {children}
      </body>
    </html>
  );
}