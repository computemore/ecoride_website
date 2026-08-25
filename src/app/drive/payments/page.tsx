import type { Metadata } from 'next';

import { pageSeo } from '@/config/site-content';
import { PaymentsInfoPage } from '@/page-views/payments-info-page';
import { buildMetadata } from '@/utils/metadata';

export const metadata: Metadata = buildMetadata(pageSeo.payments);

export default function Page() {
  return <PaymentsInfoPage />;
}
