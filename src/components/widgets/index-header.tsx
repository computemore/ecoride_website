'use client';

import Link from 'next/link';
import { useState } from 'react';

import { BaseButton } from '@/components/ui/base-button';
import { appSettings } from '@/config/app-settings';
import { headerNavigation } from '@/config/site-content';
import { ChevronDownIcon, SiteTitleIcon } from '@/icons';
import type { PublicPageKey } from '@/types';
import { cn } from '@/utils/cn';

interface IndexHeaderProps {
  pageKey: PublicPageKey;
}

export const IndexHeader = ({ pageKey }: IndexHeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [appsOpen, setAppsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const navigation = headerNavigation[pageKey];

  return (
    <header className="sticky top-0 z-40 bg-transparent backdrop-blur-xl">
      <div className="mx-auto flex max-w-content-wide items-center justify-between gap-4 px-4 py-4 md:px-6 lg:px-8">
        <Link className="shrink-0 text-2xl font-semibold tracking-[-0.08em] text-white" href="/">
          <SiteTitleIcon />
        </Link>

        <nav className="hidden items-center justify-center gap-6 lg:flex xl:gap-8">
          {navigation.map((item) =>
            item.kind === 'dropdown' ? (
              <div className="relative" key={item.label} onMouseEnter={() => setAboutOpen(true)} onMouseLeave={() => setAboutOpen(false)}>
                <button
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-white transition hover:text-white/80"
                  onClick={() => setAboutOpen((current) => !current)}
                  type="button"
                >
                  {item.label}
                  <ChevronDownIcon className={cn('h-4 w-4 transition', aboutOpen && 'rotate-180')} />
                </button>
                {aboutOpen ? (
                  <div className="surface-card absolute left-1/2 top-full mt-3 w-64 -translate-x-1/2 rounded-card p-3">
                    <div className="grid gap-1.5">
                      {item.items?.map((dropdownItem) => (
                        <Link
                          className="rounded-pill px-4 py-3 text-sm text-white/78 transition hover:bg-white/10 hover:text-white"
                          href={dropdownItem.href}
                          key={dropdownItem.label}
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <Link className="text-sm font-medium text-white transition hover:text-white/80" href={item.href ?? '/'} key={item.label}>
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="relative">
            <BaseButton className="min-w-[148px]" onClick={() => setAppsOpen((current) => !current)} variant="solid-light">
              Download Apps
              <ChevronDownIcon className={cn('h-4 w-4 transition', appsOpen && 'rotate-180')} />
            </BaseButton>
            {appsOpen ? (
              <div className="surface-card absolute right-0 top-full mt-3 w-52 rounded-card p-3">
                <div className="grid gap-1.5">
                  {Object.values(appSettings.downloadLinks).map((item) => (
                    <a
                      className="rounded-pill px-4 py-3 text-sm text-white/78 transition hover:bg-white/10 hover:text-white"
                      href={item.href}
                      key={item.label}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          <BaseButton href="/about#explore" variant="solid-light">
            Login
          </BaseButton>
        </div>

        <button
          aria-label="Open navigation menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-pill border border-white/18 bg-white/10 text-white lg:hidden"
          onClick={() => setMobileMenuOpen((current) => !current)}
          type="button"
        >
          <span className="text-lg">{mobileMenuOpen ? '×' : '≡'}</span>
        </button>
      </div>

      {mobileMenuOpen ? (
        <div className="border-t border-white/10 px-4 pb-5 pt-3 lg:hidden">
          <nav className="grid gap-2">
            {navigation.map((item) =>
              item.kind === 'dropdown' ? (
                <div className="surface-card rounded-card p-2" key={item.label}>
                  <p className="px-3 py-2 text-sm font-medium text-white">{item.label}</p>
                  <div className="grid gap-1">
                    {item.items?.map((dropdownItem) => (
                      <Link
                        className="rounded-pill px-3 py-2.5 text-sm text-white/74 transition hover:bg-white/10 hover:text-white"
                        href={dropdownItem.href}
                        key={dropdownItem.label}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {dropdownItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  className="rounded-pill px-3 py-3 text-sm font-medium text-white/78 transition hover:bg-white/10 hover:text-white"
                  href={item.href ?? '/'}
                  key={item.label}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
          <div className="mt-4 grid gap-2">
            {Object.values(appSettings.downloadLinks).map((item) => (
              <BaseButton className="w-full" href={item.href} key={item.label} variant="solid-light">
                Download {item.label}
              </BaseButton>
            ))}
            <BaseButton className="w-full" href="/about#explore" variant="solid-light">
              Login
            </BaseButton>
          </div>
        </div>
      ) : null}
    </header>
  );
};