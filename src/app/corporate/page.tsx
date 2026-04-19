import type { Metadata } from 'next';

import { pageSeo } from '@/config/site-content';
import { CorporatePage } from '@/page-views/corporate-page';
import { buildMetadata } from '@/utils/metadata';

export const metadata: Metadata = buildMetadata(pageSeo.corporate);

export default function Page() {
  return <CorporatePage />;
}