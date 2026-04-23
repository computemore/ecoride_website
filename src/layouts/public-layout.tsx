import type { CSSProperties, ReactNode } from 'react';
import { IndexHeader } from '@/components/widgets/index-header';
import { SiteFooter } from '@/components/widgets/site-footer';
import { pageThemes } from '@/config/site-content';
import type { PublicPageKey } from '@/types';
import { cn } from '@/utils/cn';

// the public layout is the standard wrapper for all public-facing pages, 
// providing a consistent header, footer, and page styling based on the page key
interface PublicLayoutProps {
  children: ReactNode;
  pageKey: PublicPageKey;
  tone?: 'brand' | 'light';
}

//  the public layout is predefined and standardised
export const PublicLayout = ({ children, pageKey, tone = 'brand' }: PublicLayoutProps) => {
  const theme = pageThemes[pageKey];
  const pageStyle = { '--page-color': theme.pageColor } as CSSProperties;

  return (
    <div 
      // Removed the background image classes from here, added 'relative' and 'z-0' base
      className={cn(
        'relative z-0 min-h-screen', 
        tone === 'light' ? 'page-surface-light' : 'page-surface'
      )} 
      style={pageStyle}
    >
      {/* Background Image Layer - ONLY renders on home page */}
      {pageKey === 'home' && (
        <div 
          // Replaced bg-cover and bg-center with animate-drift-bg
          className="pointer-events-none fixed inset-0 -z-10 bg-[url('/hero-bg-light.webp')] bg-no-repeat opacity-20 animate-drift-bg" 
          aria-hidden="true" 
        />
      )}

      <IndexHeader pageKey={pageKey} tone={tone} />
      <main>{children}</main>
      <SiteFooter tone={tone} />
    </div>
  );
};