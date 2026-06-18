import Image from 'next/image';

import { BaseButton } from '@/components/ui/base-button';
import { MarketingCard } from '@/components/widgets/marketing-card';
import { SectionHeading } from '@/components/widgets/section-heading';
import { appSettings } from '@/config/app-settings';
import { corporateOutcomeCards } from '@/config/site-content';
import { PublicLayout } from '@/layouts/public-layout';

export const CorporatePage = () => (
  <PublicLayout pageKey="corporate">
    <section className="relative overflow-hidden mx-auto flex min-h-screen max-w-content-wide items-center px-4 pb-4 pt-0 md:px-6 md:pt-0 lg:px-8 -mt-8 lg:-mt-12">
      <div className="grid gap-10 lg:grid-cols-[0.9fr,1.1fr] lg:items-center">
        <div className="text-center lg:text-left">
          {/* <p className="text-[16px] ml-1 font-semibold uppercase tracking-[0.26em] text-white/66">ecoride Corporate</p> */}
          <h1 className="text-2xl lg:text-5xl mt-6 max-w-4xl font-semibold leading-[0.96] text-white lg:max-w-5xl">
            The smart, affordable alternative for team transport.
          </h1>
          <p className="mt-6 max-w-2xl text-sm lg:text-base leading-7 text-white/80 lg:max-w-3xl">
            Designed to give organizations a fixed rate per kilometer, and a sustainable cost-management strategy for employee transport, without the burden of asset acquisition and maintenance
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <BaseButton href="/about#corporate-overview" variant="solid-light">
              Learn More
            </BaseButton>
            <BaseButton href={`mailto:${appSettings.supportEmail}`} variant="ghost-light">
              Contact Corporate Team
            </BaseButton>
          </div>
        </div>
        <div className="surface-card rounded-[var(--radius-card)] relative hidden overflow-hidden p-6 lg:flex lg:justify-center lg:p-8">
          <Image alt="Illustration of Ecoride corporate mobility planning" height={640} priority src="/corporate-hero.svg" width={640} />
        </div>
      </div>
    </section>

    {/* <section className="mx-auto max-w-content-wide px-4 pb-14 md:px-6 lg:px-8">
      <SectionHeading
        description="By partnering with Ecoride, corporate clients can reduce their carbon footprint, save money, and provide employees with a more dependable mobility option backed by a dedicated support team"
        eyebrow="Corporate value"
        title="Better business transport that works for you and your employees"
        tone="brand"
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {corporateFeatureCards.map((card) => (
          <MarketingCard key={card.title} {...card} />
        ))}
      </div>
    </section> */}

    <section className="mx-auto max-w-content-wide px-4 pb-24 md:px-6 lg:px-8 my-12">
      <SectionHeading
        description=""
        eyebrow="Why go corporate with Ecoride?"
        title="We offer corporate value - transparency, clean cost control, extensive oversight and analytics"
        tone="brand"
      />
      <div className="mt-4 grid gap-5 md:grid-cols-3">
        {corporateOutcomeCards.map((card) => (
          <MarketingCard key={card.title} {...card} />
        ))}
      </div>
    </section>

    <section className="mx-auto max-w-content-wide px-4 pb-24 md:px-6 lg:px-8 my-24">
      <div className="surface-card rounded-[var(--radius-card)] grid gap-6 p-6 md:grid-cols-[1fr,auto] md:items-center md:p-6">
        <div>
          <p className="text-[14px] font-semibold uppercase tracking-[0.24em] text-white/68">Corporate support</p>
          <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">Plan team transport with more clarity and less transportation burden</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/76 md:text-base md:leading-8">
            Ecoride Corporate is built for organizations that want clearer transport costs, dashboard visibility, and a dedicated support team instead of more depreciating vehicles to manage.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <BaseButton href={`mailto:${appSettings.supportEmail}`} variant="solid-light">
            Talk to Corporate Support
          </BaseButton>
          {/* <BaseButton href="/about#corporate-overview" variant="ghost-light">
            Corporate Overview
          </BaseButton> */}
        </div>
      </div>
    </section>
  </PublicLayout>
);