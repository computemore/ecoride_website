import type { Metadata } from 'next';

import { pageSeo } from '@/config/site-content';
import { AboutPage } from '@/page-views/about-page';
import { buildMetadata } from '@/utils/metadata';

export const metadata: Metadata = buildMetadata(pageSeo.about);

export default function Page() {
  return <AboutPage />;
}