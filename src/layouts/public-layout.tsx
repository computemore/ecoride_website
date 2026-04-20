import type { CSSProperties, ReactNode } from 'react';

import { IndexHeader } from '@/components/widgets/index-header';
import { SiteFooter } from '@/components/widgets/site-footer';
import { pageThemes } from '@/config/site-content';
import type { PublicPageKey } from '@/types';
import { cn } from '@/utils/cn';

interface PublicLayoutProps {
  children: ReactNode;
  pageKey: PublicPageKey;
  tone?: 'brand' | 'light';
}

export const PublicLayout = ({ children, pageKey, tone = 'brand' }: PublicLayoutProps) => {
  const theme = pageThemes[pageKey];
  const pageStyle = { '--page-color': theme.pageColor } as CSSProperties;

  return (
    <div className={cn('min-h-screen', tone === 'light' ? 'page-surface-light' : 'page-surface')} style={pageStyle}>
      <IndexHeader pageKey={pageKey} tone={tone} />
      <main>{children}</main>
      <SiteFooter tone={tone} />
    </div>
  );
};