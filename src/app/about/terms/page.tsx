import type { Metadata } from 'next';

import { legalPageSeo } from '@/config/site-content';
import { LegalPage } from '@/page-views/legal-page';
import { buildMetadata } from '@/utils/metadata';

export const metadata: Metadata = buildMetadata(legalPageSeo.terms);

export default function Page() {
  return <LegalPage slug="terms" />;
}