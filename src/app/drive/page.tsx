import type { Metadata } from 'next';

import { pageSeo } from '@/config/site-content';
import { DrivePage } from '@/page-views/drive-page';
import { buildMetadata } from '@/utils/metadata';

export const metadata: Metadata = buildMetadata(pageSeo.drive);

export default function Page() {
  return <DrivePage />;
}