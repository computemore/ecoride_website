import Link from 'next/link';

import { appSettings } from '@/config/app-settings';
import { cn } from '@/utils/cn';

interface SiteFooterProps {
  tone?: 'brand' | 'light';
}

export const SiteFooter = ({ tone = 'brand' }: SiteFooterProps) => {
  const isLightTone = tone === 'light';

  return (
    <footer className={cn('pb-10 pt-8', isLightTone ? 'border-none bg-white/60' : 'border-none bg-slate-950/40')}>
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
          <div className={cn('mt-4 space-y-1 text-xs leading-6 sm:text-sm sm:leading-7', isLightTone ? 'text-slate-600' : 'text-white/72')}>
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
          <p className={cn('text-xs font-semibold uppercase tracking-[0.24em] sm:text-sm', isLightTone ? 'text-slate-500' : 'text-white/68')}>Explore</p>
          <div className={cn('mt-4 grid gap-2 text-xs sm:text-sm', isLightTone ? 'text-slate-600' : 'text-white/72')}>
            <Link className='hover:font-bold' href="/ride">Ride</Link>
            <Link className='hover:font-bold' href="/drive">Drive</Link>
            <Link className='hover:font-bold' href="/corporate">Corporate</Link>
            <Link className='hover:font-bold' href="/about">About</Link>
            <Link className='hover:font-bold' href="/about/terms">Terms</Link>
            <Link className='hover:font-bold' href="/about/privacy-policy">Privacy Policy</Link>
          </div>
        </div>
        <div>
          <p className={cn('text-xs font-semibold uppercase tracking-[0.24em] sm:text-sm', isLightTone ? 'text-slate-500' : 'text-white/68')}>Connect</p>
          <div className={cn('mt-4 grid gap-2 text-xs sm:text-sm', isLightTone ? 'text-slate-600' : 'text-white/72')}>
            {appSettings.socialLinks.map((link) => (
              <a 
                className="hover:font-bold transition" 
                href={link.href} key={link.label} rel="noreferrer" target="_blank">
                {link.label}
              </a>
            ))}
            <a 
              className="hover:text-teal-600 hover:font-bold transition" 
              href={appSettings.downloadLinks.rider.href} rel="noreferrer" target="_blank">
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