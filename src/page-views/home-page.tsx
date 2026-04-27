import { BaseButton } from '@/components/ui/base-button';
import { ArrowRightIcon, SiteTitleIconDark } from '@/icons';
import { PublicLayout } from '@/layouts/public-layout';
import { MarketingCard } from '@/components/widgets/marketing-card';
import { MapOffice } from '@/components/widgets/map-office';
import { SectionHeading } from '@/components/widgets/section-heading';
import { appSettings } from '@/config/app-settings';
import { homeAboutCards, homeInfoCards, homeSignalStats } from '@/config/site-content';

export const HomePage = () => (
  <PublicLayout pageKey="home" tone="light">
    <section className="mx-auto flex min-h-screen max-w-content-wide items-center px-4 pb-14 pt-0 md:px-6 md:pt-0 lg:px-8">
      <div className="w-full">
        <div className="text-center">
          <p className="text-[16px] md:text-[17px] font-bold uppercase tracking-[0.28em] text-slate-950/85">Local-first mobility in Malawi</p>
          <h1 className="text-balance mx-auto mt-6 max-w-5xl text-4xl font-medium leading-[0.92] text-slate-950/95 md:text-7xl lg:text-[5.4rem]">
            <SiteTitleIconDark className='w-[180px] md:w-[380px]  inline-flex items-center justify-center'/><br />a ride simplified
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-[13px] leading-7 md:text-[18px] md:leading-10 text-slate-950/85">
            A local-first ride sharing and car rental platform by Malawians, for Malawians, with support for corporates . . .
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <BaseButton href={appSettings.downloadLinks.rider.href} variant="solid-green">
              Download Rider App
            </BaseButton>
            <BaseButton href="/corporate" variant="ghost-dark">
              Explore Corporate
            </BaseButton>
          </div>
        </div>
      </div>
    </section>

    {/* rider app section */}
    <section className="mx-auto max-w-content-wide px-4 pb-14 md:px-6 lg:px-8">
      <SectionHeading
        description="Intentionally designed to take you wherever you want to go"
        eyebrow="The Ecoride rider app"
        title="Explore the ecoride rider app on both iOS and Android"
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {homeInfoCards.map((card) => (
          <MarketingCard key={card.title} {...card} />
        ))}
      </div>
    </section>

    {/* driver app and program section */}
    <section className="mx-auto max-w-content-wide px-4 pb-14 md:px-6 lg:px-8">
      <SectionHeading
        description="Your money, your way - we understand, your time matters"
        eyebrow="Want to earn?"
        title="Enroll for our driver program and start earning with ecoride"
        forceAlignment='right'
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {homeInfoCards.map((card) => (
          <MarketingCard key={card.title} {...card} />
        ))}
      </div>
    </section>

    {/* above the footer content */}
    <section className="mx-auto max-w-content-wide px-4 pb-24 md:px-6 lg:px-8">
      <div className="surface-card rounded-card grid gap-8 p-7 md:grid-cols-[1.2fr,0.8fr] md:p-10">
        <div>
          <p className="text-[14px] font-semibold uppercase tracking-[0.24em] text-slate-950/85">Local credibility</p>
          <h2 className="mt-4 text-2xl font-medium text-slate-950/95 md:text-4xl">Grounded in Blantyre, built for the journeys people already make</h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-950/85 md:text-base md:leading-8">
            The new website treats Ecoride as a platform for riders, drivers, and teams without hiding the fact that real local transport depends on
            practical support, local contact, and clear expectations.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <BaseButton href="/about" variant="solid-dark">
              About Ecoride
            </BaseButton>
            <BaseButton href="/drive" variant="ghost-dark">
              Driver Opportunities
            </BaseButton>
          </div>
        </div>
        <div className="rounded-card border border-slate-950/12 bg-black/10 p-6">
          <p className="text-sm font-semibold text-slate-950">Visit or call</p>
          <div className="mt-4 space-y-2 text-[14px] leading-6 text-slate-950/74 sm:text-sm sm:leading-7">
            {appSettings.addressLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
            {appSettings.phoneNumbers.map((phone) => (
              <p key={phone}>{phone}</p>
            ))}
            <a className="inline-flex break-all items-center gap-2 pt-3 text-slate-950" href={`mailto:${appSettings.supportEmail}`}>
              {appSettings.supportEmail}
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="w-full md:col-span-2 rounded-[20px] border border-slate-950/12 ">
          <MapOffice />
        </div>
      </div>
    </section>

    {/* office location section
    <section className="mx-auto max-w-content-wide px-4 pb-24 md:px-6 lg:px-8">
      <MapOffice />
    </section> */}
  </PublicLayout>
);