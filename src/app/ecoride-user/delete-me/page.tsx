import type { Metadata } from 'next';

import { DeleteMePage } from '@/page-views/delete-me-page';
import { buildMetadata } from '@/utils/metadata';

const deleteMeSeo = {
  title: 'Delete Your Ecoride Account | Account Deletion Information',
  description:
    'Learn how Ecoride handles account deletion requests for riders and drivers, including verification, the recovery window, retained records, and support options.',
  canonical: '/ecoride-user/delete-me',
  ogImage: '/ecoride-256.png',
  keywords: ['delete Ecoride account', 'Ecoride account deletion', 'remove rider account', 'remove driver account'],
};

export const metadata: Metadata = buildMetadata(deleteMeSeo);

export default function Page() {
  return <DeleteMePage />;
}