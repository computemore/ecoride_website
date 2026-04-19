import Link from 'next/link';

import { appSettings } from '@/config/app-settings';

export const SiteFooter = () => (
  <footer className="border-t border-white/14 pb-10 pt-8">
    <div className="mx-auto grid max-w-content-wide gap-8 px-4 sm:grid-cols-2 md:px-6 lg:grid-cols-[1.1fr,0.9fr,0.8fr,0.8fr] lg:px-8">
      <div>
        <p className="text-2xl font-semibold tracking-[-0.06em] text-white">ecoride</p>
        <p className="mt-4 max-w-md text-sm leading-7 text-white/72">
          A local-first ride sharing app by Malawians, for Malawians. Rider, driver, and corporate transport entry points live under one
          clean, search-friendly public platform.
        </p>
      </div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/68">Contact</p>
        <div className="mt-4 space-y-2 text-sm leading-7 text-white/72">
          {appSettings.addressLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
          {appSettings.phoneNumbers.map((phone) => (
            <p key={phone}>{phone}</p>
          ))}
          <a href={`mailto:${appSettings.supportEmail}`}>{appSettings.supportEmail}</a>
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/68">Explore</p>
        <div className="mt-4 grid gap-2 text-sm text-white/72">
          <Link href="/ride">Ride</Link>
          <Link href="/drive">Drive</Link>
          <Link href="/corporate">Corporate</Link>
          <Link href="/about">About</Link>
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/68">Connect</p>
        <div className="mt-4 grid gap-2 text-sm text-white/72">
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