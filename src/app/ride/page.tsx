import type { Metadata } from 'next';

import { pageSeo } from '@/config/site-content';
import { RidePage } from '@/page-views/ride-page';
import { buildMetadata } from '@/utils/metadata';

export const metadata: Metadata = buildMetadata(pageSeo.ride);

export default function Page() {
  return <RidePage />;
}