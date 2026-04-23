import Link from 'next/link';

import { appSettings } from '@/config/app-settings';
import { cn } from '@/utils/cn';

interface SiteFooterProps {
  tone?: 'brand' | 'light';
}

export const SiteFooter = ({ tone = 'brand' }: SiteFooterProps) => {
  const isLightTone = tone === 'light';

  return (
    <footer className={cn('pb-10 pt-8', isLightTone ? 'border-t border-slate-900/10' : 'border-t border-white/14')}>
      <div className="mx-auto grid max-w-content-wide gap-8 px-4 sm:grid-cols-2 md:px-6 lg:grid-cols-[1.1fr,0.9fr,0.8fr,0.8fr] lg:px-8">
        <div>
          <p className={cn('text-xl font-semibold tracking-[-0.06em] md:text-2xl', isLightTone ? 'text-slate-950' : 'text-white')}>ecoride</p>
          <p className={cn('mt-4 max-w-md text-xs leading-6 sm:text-sm sm:leading-7', isLightTone ? 'text-slate-600' : 'text-white/72')}>
            A local-first ride sharing app by Malawians, for Malawians. Rider, driver, and corporate transport entry points live under one
            clean, search-friendly public platform.
          </p>
        </div>
        <div>
          <p className={cn('text-xs font-semibold uppercase tracking-[0.24em] sm:text-sm', isLightTone ? 'text-slate-500' : 'text-white/68')}>Contact</p>
          <div className={cn('mt-4 space-y-2 text-xs leading-6 sm:text-sm sm:leading-7', isLightTone ? 'text-slate-600' : 'text-white/72')}>
            {appSettings.addressLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
            {appSettings.phoneNumbers.map((phone) => (
              <p key={phone}>{phone}</p>
            ))}
            <a className="break-all" href={`mailto:${appSettings.supportEmail}`}>
              {appSettings.supportEmail}
            </a>
          </div>
        </div>
        <div>
          <p className={cn('text-xs font-semibold uppercase tracking-[0.24em] sm:text-sm', isLightTone ? 'text-slate-500' : 'text-white/68')}>Explore</p>
          <div className={cn('mt-4 grid gap-2 text-xs sm:text-sm', isLightTone ? 'text-slate-600' : 'text-white/72')}>
            <Link href="/ride">Ride</Link>
            <Link href="/drive">Drive</Link>
            <Link href="/corporate">Corporate</Link>
            <Link href="/about">About</Link>
            <Link href="/about/terms">Terms</Link>
            <Link href="/about/privacy-policy">Privacy Policy</Link>
          </div>
        </div>
        <div>
          <p className={cn('text-xs font-semibold uppercase tracking-[0.24em] sm:text-sm', isLightTone ? 'text-slate-500' : 'text-white/68')}>Connect</p>
          <div className={cn('mt-4 grid gap-2 text-xs sm:text-sm', isLightTone ? 'text-slate-600' : 'text-white/72')}>
            {appSettings.socialLinks.map((link) => (
              <a href={link.href} key={link.label} rel="noreferrer" target="_blank">
                {link.label}
              </a>
            ))}
            <a href={appSettings.downloadLinks.rider.href} rel="noreferrer" target="_blank">
              Rider App
            </a>
            <a href={appSettings.downloadLinks.driver.href} rel="noreferrer" target="_blank">
              Driver App
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};