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
  tone?: 'brand' | 'light';
}

export const IndexHeader = ({ pageKey, tone = 'brand' }: IndexHeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [appsOpen, setAppsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const isLightTone = tone === 'light';

  const navigation = headerNavigation[pageKey];

  return (
    <header
      className={cn(
        'sticky top-0 z-40 backdrop-blur-xl',
        isLightTone ? 'bg-[#FCFCFC]/92' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex max-w-content-wide items-center justify-between gap-4 px-4 py-4 md:px-6 lg:px-8">
        <Link className={cn('shrink-0 text-2xl font-semibold tracking-[-0.08em]', isLightTone ? 'text-slate-950' : 'text-white')} href="/">
          <SiteTitleIcon />
        </Link>

        <nav className="hidden items-center justify-center gap-6 lg:flex xl:gap-8">
          {navigation.map((item) =>
            item.kind === 'dropdown' ? (
              <div className="relative" key={item.label} onMouseEnter={() => setAboutOpen(true)} onMouseLeave={() => setAboutOpen(false)}>
                <button
                  aria-expanded={aboutOpen}
                  className={cn(
                    'inline-flex items-center gap-1.5 text-sm font-medium transition',
                    isLightTone ? 'text-slate-900 hover:text-slate-700' : 'text-white hover:text-white/80',
                  )}
                  onClick={() => setAboutOpen((current) => !current)}
                  type="button"
                >
                  {item.label}
                  <ChevronDownIcon className={cn('h-4 w-4 transition', aboutOpen && 'rotate-180')} />
                </button>
                {aboutOpen ? (
                  <div
                    className={cn(
                      'absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3',
                    )}
                  >
                    <div className={cn('rounded-card p-3', isLightTone ? 'surface-card-light' : 'surface-card')}>
                      <div className="grid gap-1.5">
                        {item.items?.map((dropdownItem) => (
                          <Link
                            className={cn(
                              'rounded-pill px-4 py-3 text-sm transition',
                              isLightTone
                                ? 'text-slate-700 hover:bg-slate-900/5 hover:text-slate-950'
                                : 'text-white/78 hover:bg-white/10 hover:text-white',
                            )}
                            href={dropdownItem.href}
                            key={dropdownItem.label}
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <Link
                className={cn(
                  'text-sm font-medium transition',
                  isLightTone ? 'text-slate-900 hover:text-slate-700' : 'text-white hover:text-white/80',
                )}
                href={item.href ?? '/'}
                key={item.label}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="relative">
            <BaseButton className="min-w-[148px]" onClick={() => setAppsOpen((current) => !current)} variant={isLightTone ? 'ghost-outline-dark' : 'solid-light'}>
              Download Apps
              <ChevronDownIcon className={cn('h-4 w-4 transition', appsOpen && 'rotate-180')} />
            </BaseButton>
            {appsOpen ? (
              <div className={cn('absolute right-0 top-full mt-3 w-52 rounded-card p-3', isLightTone ? 'surface-card-light' : 'surface-card')}>
                <div className="grid gap-1.5">
                  {Object.values(appSettings.downloadLinks).map((item) => (
                    <a
                      className={cn(
                        'rounded-pill px-4 py-3 text-sm transition',
                        isLightTone
                          ? 'text-slate-700 hover:bg-slate-900/5 hover:text-slate-950'
                          : 'text-white/78 hover:bg-white/10 hover:text-white',
                      )}
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
          <BaseButton href="/about#explore" variant={isLightTone ? 'solid-dark' : 'solid-light'}>
            Login
          </BaseButton>
        </div>

        <button
          aria-label="Open navigation menu"
          className={cn(
            'inline-flex h-11 w-11 items-center justify-center rounded-pill lg:hidden',
            isLightTone
              ? 'border border-slate-900/10 bg-slate-900/4 text-slate-900'
              : 'border border-white/18 bg-white/10 text-white',
          )}
          onClick={() => setMobileMenuOpen((current) => !current)}
          type="button"
        >
          <span className="text-lg">{mobileMenuOpen ? '×' : '≡'}</span>
        </button>
      </div>

      {mobileMenuOpen ? (
        <div className={cn('px-4 pb-5 pt-3 lg:hidden', isLightTone ? 'border-t border-slate-900/8' : 'border-t border-white/10')}>
          <nav className="grid gap-2">
            {navigation.map((item) =>
              item.kind === 'dropdown' ? (
                <div className={cn('rounded-card p-2', isLightTone ? 'surface-card-light' : 'surface-card')} key={item.label}>
                  <p className={cn('px-3 py-2 text-sm font-medium', isLightTone ? 'text-slate-950' : 'text-white')}>{item.label}</p>
                  <div className="grid gap-1">
                    {item.items?.map((dropdownItem) => (
                      <Link
                        className={cn(
                          'rounded-pill px-3 py-2.5 text-sm transition',
                          isLightTone
                            ? 'text-slate-700 hover:bg-slate-900/5 hover:text-slate-950'
                            : 'text-white/74 hover:bg-white/10 hover:text-white',
                        )}
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
                  className={cn(
                    'rounded-pill px-3 py-3 text-sm font-medium transition',
                    isLightTone
                      ? 'text-slate-700 hover:bg-slate-900/5 hover:text-slate-950'
                      : 'text-white/78 hover:bg-white/10 hover:text-white',
                  )}
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
              <BaseButton className="w-full" href={item.href} key={item.label} variant={isLightTone ? 'ghost-outline-dark' : 'solid-light'}>
                Download {item.label}
              </BaseButton>
            ))}
            <BaseButton className="w-full" href="/about#explore" variant={isLightTone ? 'solid-dark' : 'solid-light'}>
              Login
            </BaseButton>
          </div>
        </div>
      ) : null}
    </header>
  );
};