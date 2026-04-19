import type { Metadata } from 'next';

import { pageSeo } from '@/config/site-content';
import { HomePage } from '@/page-views/home-page';
import { buildMetadata } from '@/utils/metadata';

export const metadata: Metadata = buildMetadata(pageSeo.home);

export default function Page() {
  return <HomePage />;
}