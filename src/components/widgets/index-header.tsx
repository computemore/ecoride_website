'use client';

import Link from 'next/link';
import { useState } from 'react';

import { BaseButton } from '@/components/ui/base-button';
import { appSettings } from '@/config/app-settings';
import { headerNavigation } from '@/config/site-content';
import { ChevronDownIcon, SiteTitleIcon, EcorideMenuIcon, EcorideCloseIcon, SiteTitleIconDark, SiteTitleIconRound } from '@/icons';
import type { PublicPageKey } from '@/types';
import { cn } from '@/utils/cn';
import { useRiderDownloadUrl } from '@/hooks/use-rider-download-url';

interface IndexHeaderProps {
  pageKey: PublicPageKey;
  tone?: 'brand' | 'light';
}

// function to modularise the header
export const IndexHeader = ({ pageKey, tone = 'brand' }: IndexHeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
  const [appsOpen, setAppsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const isLightTone = tone === 'light';
  const riderDownloadUrl = useRiderDownloadUrl();

  const navigation = headerNavigation[pageKey];
  
  // close and toggle function for mobile menu, also ensures dropdowns are closed when toggling
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileDropdownOpen(null);
  };
  const toggleMobileMenu = () => {
    setMobileMenuOpen((current) => {
      if (current) {
        setMobileDropdownOpen(null);
        return false;
      }

      setMobileDropdownOpen(null);
      return true;
    });
  };

  // return type
  return (
    <header
      className={cn(
        'sticky top-0 z-40',
        isLightTone ? 'bg-transparent' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex max-w-content-wide items-center justify-between gap-3 px-4 py-4 md:gap-4 md:px-6 lg:px-8">
        {/* site title icon */}
        <Link className={cn('min-w-0 shrink-0 text-2xl font-semibold tracking-[-0.08em]', isLightTone ? 'text-slate-950' : 'text-white')} href="/">
          {pageKey === 'home' ? (
            <SiteTitleIconRound /> 
          ) : (
            isLightTone ? <SiteTitleIconDark /> : <SiteTitleIcon />
          )}
        </Link>

        {/* navigation items */}
        <nav className="hidden items-center justify-center gap-4 lg:flex xl:gap-8">
          {navigation.map((item) =>
            item.kind === 'dropdown' ? (
              <div className="relative" key={item.label} onMouseEnter={() => setAboutOpen(true)} onMouseLeave={() => setAboutOpen(false)}>
                <button
                  aria-expanded={aboutOpen}
                  className={cn(
                    'inline-flex items-center gap-2 text-[16px] font-medium transition',
                    isLightTone ? 'text-slate-900 hover:font-bold' : 'text-white hover:font-bold',
                  )}
                  onClick={() => setAboutOpen((current) => !current)}
                  type="button"
                >
                  {item.label}
                  <ChevronDownIcon className={cn('h-6 w-6 transition', aboutOpen && 'rotate-180')} />
                </button>
                {/* dropdown menu */}
                {aboutOpen ? (
                  <div
                    className={cn(
                      'absolute left-1/2 top-full w-64 -translate-x-1/2 pt-2',
                    )}
                  >
                    <div className={cn('rounded-[16px] p-1', isLightTone ? 'surface-card-light' : 'surface-card')}>
                      <div className="grid gap-1.5">
                        {item.items?.map((dropdownItem) => (
                          <Link
                            className={cn(
                              'rounded-[14px] px-3.5 py-2 text-[14px] transition',
                              isLightTone
                                ? 'text-slate-700 hover:bg-slate-900/5 hover:text-slate-950 hover:font-bold'
                                : 'text-white/78 hover:bg-white/10 hover:text-white hover:font-bold',
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
              // for non-dropdown items, just render a link
              <Link
                className={cn(
                  'text-[16px] font-medium transition',
                  isLightTone ? 'text-slate-900 hover:font-bold' : 'text-white hover:font-bold',
                )}
                href={item.href ?? '/'}
                key={item.label}
              >
                {item.label}
              </Link>
            ),
          )}
          {/* download button */}
          <div className="relative">
            <BaseButton className="min-w-[148px] w-[180px] pl-3 pr-1.5" onClick={() => setAppsOpen((current) => !current)} variant={isLightTone ? 'solid-dark' : 'solid-light'}>
              Download Apps
              <ChevronDownIcon className={cn('h-6 w-6 transition', appsOpen && 'rotate-180')} />
            </BaseButton>
            {appsOpen ? (
              <div className={cn('absolute right-0 top-full mt-2 w-[180px] rounded-[16px] p-1', isLightTone ? 'surface-card-light' : 'surface-card')}>
                <div className="grid gap-1">
                  {Object.values(appSettings.downloadLinks).map((item) => (
                    <a
                      className={cn(
                        'rounded-[14px] px-3.5 py-2 text-[14px] transition',
                        isLightTone
                          ? 'text-slate-700 hover:bg-slate-900/5 hover:text-slate-950 hover:font-bold'
                          : 'text-white/80 hover:bg-white/10 hover:text-white hover:font-bold',
                      )}
                      href={item.label === 'Rider' ? riderDownloadUrl : item.href}
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
        </nav>
        
        {/* cta buttons in header, desktop version */}
        <div className="hidden items-center gap-3 lg:flex">
          {/* login button */}
          <BaseButton href="/login-coming-soon" variant={isLightTone ? 'solid-dark' : 'solid-light'}>
            Login
          </BaseButton>
        </div>

        {/* mobile menu burger button */}
        <button
          aria-label="Open navigation menu"
          className={cn(
            'inline-flex h-12 w-12 items-center justify-center rounded-full lg:hidden',
            isLightTone
              ? 'text-slate-950 hover:bg-slate-900/5 hover:text-slate-700'
              : 'text-white/78 hover:bg-white/10 hover:text-white',
          )}
          onClick={toggleMobileMenu}
          type="button"
        >
          {mobileMenuOpen ?
            <EcorideCloseIcon sx={{ fontSize: 32 }} /> :
            <EcorideMenuIcon sx={{ fontSize: 32 }} />
          }
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen ? (
        <div className={cn('px-4 pb-5 pt-0 lg:hidden', isLightTone ? ' border-slate-900/8 bg-[#FCFCFC]/70' : 'border-white/10 bg-black/10')}>
          <div className="flex max-h-[calc(100vh-5.5rem)] flex-col overflow-y-auto">
            <nav className="grid gap-1">
              {navigation.map((item) =>
                item.kind === 'dropdown' ? (
                  <div className={cn('rounded-[16px] p-1', isLightTone ? 'surface-card-light' : 'surface-card')} key={item.label}>
                    <button
                      aria-expanded={mobileDropdownOpen === item.label}
                      className={cn(
                        'flex w-full items-center justify-between gap-2 rounded-[14px] pl-3 pr-2 py-2 text-left text-[16px] font-medium transition',
                        isLightTone ? 'text-slate-950 hover:bg-slate-900/5' : 'text-white hover:bg-white/10',
                      )}
                      onClick={() => setMobileDropdownOpen((current) => (current === item.label ? null : item.label))}
                      type="button"
                    >
                      <span>{item.label}</span>
                      <ChevronDownIcon className={cn('h-6 w-6 transition', mobileDropdownOpen === item.label && 'rotate-180')} />
                    </button>
                    {/* dropdown items */}
                    {mobileDropdownOpen === item.label ? (
                      <div className="mt-1 grid gap-1">
                        {item.items?.map((dropdownItem) => (
                          <Link
                            className={cn(
                              'rounded-[14px] pl-3 pr-2 py-2 text-[14px] transition',
                              isLightTone
                                ? 'text-slate-700 hover:bg-slate-900/5 hover:text-slate-950'
                                : 'text-white/74 hover:bg-white/10 hover:text-white',
                            )}
                            href={dropdownItem.href}
                            key={dropdownItem.label}
                            onClick={closeMobileMenu}
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <Link
                    className={cn(
                      'rounded-[14px] px-5 py-4 text-[16px] font-medium transition',
                      isLightTone
                        ? 'text-slate-700 hover:bg-slate-900/5 hover:text-slate-950'
                        : 'text-white/78 hover:bg-white/10 hover:text-white',
                    )}
                    href={item.href ?? '/'}
                    key={item.label}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>
            <div className={cn('mt-6 grid gap-2 border-t pt-4', isLightTone ? 'border-slate-900/8' : 'border-white/10')}>
          {/* download button */}
          <div className="relative">
            <BaseButton className="min-w-[148px] w-full pl-3 pr-1.5" onClick={() => setAppsOpen((current) => !current)} variant={isLightTone ? 'solid-dark' : 'solid-light'}>
              Download Apps
              <ChevronDownIcon className={cn('h-6 w-6 transition', appsOpen && 'rotate-180')} />
            </BaseButton>
            {appsOpen ? (
              <div className={cn('absolute right-0 top-full mt-2 w-full rounded-[14px] p-1', isLightTone ? 'surface-card-light' : 'surface-card')}>
                <div className="grid gap-1">
                  {Object.values(appSettings.downloadLinks).map((item) => (
                    <a
                      className={cn(
                        'rounded-[14px] px-3.5 py-2 text-[14px] transition',
                        isLightTone
                          ? 'text-slate-700 hover:bg-slate-900/5 hover:text-slate-950'
                          : 'text-white/78 hover:bg-white/10 hover:text-white',
                      )}
                      href={item.label === 'Rider' ? riderDownloadUrl : item.href}
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
              <BaseButton className="w-full" href="/login-coming-soon" variant={isLightTone ? 'solid-dark' : 'solid-light'}>
                Login
              </BaseButton>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
};