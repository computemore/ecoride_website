import type { CSSProperties, ReactNode } from 'react';

import { IndexHeader } from '@/components/widgets/index-header';
import { SiteFooter } from '@/components/widgets/site-footer';
import { pageThemes } from '@/config/site-content';
import type { PublicPageKey } from '@/types';

interface PublicLayoutProps {
  children: ReactNode;
  pageKey: PublicPageKey;
}

export const PublicLayout = ({ children, pageKey }: PublicLayoutProps) => {
  const theme = pageThemes[pageKey];
  const pageStyle = { '--page-color': theme.pageColor } as CSSProperties;

  return (
    <div className="page-surface min-h-screen" style={pageStyle}>
      <IndexHeader pageKey={pageKey} />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
};