'use client';

import Link from 'next/link';

import { appSettings } from '@/config/app-settings';
import { cn } from '@/utils/cn';
import { SiteTitleIcon, SiteTitleIconDark } from '@/icons/headings/site-title';
import { useRiderDownloadUrl } from '@/hooks/use-rider-download-url';

interface SiteFooterProps {
  tone?: 'brand' | 'light';
}

export const SiteFooter = ({ tone = 'brand' }: SiteFooterProps) => {
  const isLightTone = tone === 'light';
  const riderDownloadUrl = useRiderDownloadUrl();

  return (
    <footer className={cn('pb-10 pt-8', isLightTone ? 'border-none bg-white/60' : 'border-none bg-slate-950/20')}>
      <div className="mx-auto grid max-w-content-wide gap-8 px-4 sm:grid-cols-2 md:px-6 lg:grid-cols-[1.1fr,0.9fr,0.8fr,0.8fr] lg:px-8">
        <div>
          {/* <p className={cn('text-xl font-semibold tracking-[-0.06em] md:text-2xl', isLightTone ? 'text-slate-950' : 'text-white')}>ecoride</p> */}
          <Link className={cn('min-w-0 shrink-0 text-2xl font-semibold tracking-[-0.08em]', isLightTone ? 'text-slate-950' : 'text-white')} href="/">
            {
              isLightTone ? <SiteTitleIconDark /> : <SiteTitleIcon />
            }
          </Link>
          <p className={cn('mt-2 max-w-md text-xs leading-6 sm:text-sm sm:leading-7', isLightTone ? 'text-slate-600' : 'text-white/70')}>
            A local-first ride sharing app by Malawians, for Malawians. Rider, driver, and corporate transport entry points live under one
            clean, search-friendly public platform.
          </p>
        </div>
        <div>
          <p className={cn('text-xs font-semibold uppercase tracking-[0.24em] sm:text-sm', isLightTone ? 'text-slate-950/95' : 'text-white/85')}>Contact</p>
          <div className={cn('mt-2 space-y-1 text-xs leading-6 sm:text-sm sm:leading-7', isLightTone ? 'text-slate-600' : 'text-white/70')}>
            {appSettings.addressLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
            {appSettings.phoneNumbers.map((phone) => (
              <p key={phone}>{phone}</p>
            ))}
            <a 
              className="rounded-[18px] text-[15px] bg-slate-950 inline-flex break-all items-center gap-2 pl-3 pr-2 text-white hover:scale-[1.04]" 
              href={`mailto:${appSettings.supportEmail}`}
            >
              {appSettings.supportEmail}
            </a>
          </div>
        </div>
        <div>
          <p className={cn('text-xs font-semibold uppercase tracking-[0.24em] sm:text-sm', isLightTone ? 'text-slate-950/95' : 'text-white/85')}>Explore</p>
          <div className={cn('mt-3 grid gap-2 text-xs sm:text-sm', isLightTone ? 'text-slate-600' : 'text-white/70')}>
            <Link className='hover:font-bold' href="/ride">Ride</Link>
            <Link className='hover:font-bold' href="/drive">Drive</Link>
            <Link className='hover:font-bold' href="/corporate">Corporate</Link>
            {/* <Link className='hover:font-bold' href="/about">About</Link> */}
            <Link className='hover:font-bold' href="/about/terms">Terms</Link>
            <Link className='hover:font-bold' href="/about/privacy-policy">Privacy Policy</Link>
          </div>
        </div>
        <div>
          <p className={cn('text-xs font-semibold uppercase tracking-[0.24em] sm:text-sm', isLightTone ? 'text-slate-950/95' : 'text-white/85')}>Connect</p>
          <div className={cn('mt-3 grid gap-2 text-xs sm:text-sm', isLightTone ? 'text-slate-600' : 'text-white/70')}>
            {appSettings.socialLinks.map((link) => (
              <a 
                className="hover:font-bold transition" 
                href={link.href} key={link.label} rel="noreferrer" target="_blank">
                {link.label}
              </a>
            ))}
            <a 
              className="hover:text-teal-600 hover:font-bold transition" 
              href={riderDownloadUrl} rel="noreferrer" target="_blank">
              Rider App
            </a>
            <a 
              className="hover:text-red-600 hover:font-bold transition" 
              href={appSettings.downloadLinks.driver.href} rel="noreferrer" target="_blank">
              Driver App
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};