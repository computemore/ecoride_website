import Image from 'next/image';

import { BaseButton } from '@/components/ui/base-button';
import { MarketingCard } from '@/components/widgets/marketing-card';
import { SectionHeading } from '@/components/widgets/section-heading';
import { appSettings } from '@/config/app-settings';
import { corporateFeatureCards, corporateOutcomeCards } from '@/config/site-content';
import { PublicLayout } from '@/layouts/public-layout';

export const CorporatePage = () => (
  <PublicLayout pageKey="corporate">
    <section className="mx-auto max-w-content-wide px-4 pb-12 pt-20 md:px-6 md:pt-24 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.08fr,0.92fr] lg:items-center">
        <div className="text-center lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-white/66">Corporate</p>
          <h1 className="text-balance mt-6 max-w-4xl text-5xl font-semibold leading-[0.96] text-white md:text-7xl lg:max-w-5xl">
            Business transport works better when pricing, visibility, and support stay clear
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/76 lg:max-w-3xl">
            Ecoride Corporate gives organizations a fixed rate per kilometer, ride visibility through dashboards and analytics, and a more sustainable way to manage team transport than buying depreciating vehicles and running fleets.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <BaseButton href="/about#corporate-overview" variant="solid-light">
              Learn More
            </BaseButton>
            <BaseButton href={`mailto:${appSettings.supportEmail}`} variant="ghost-light">
              Contact Corporate Team
            </BaseButton>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/72 lg:max-w-2xl">
            By partnering with Ecoride, corporate clients can reduce their carbon footprint, save money, and provide employees with a more dependable mobility option backed by a dedicated support team.
          </p>
        </div>
        <div className="surface-card rounded-card relative hidden overflow-hidden p-6 lg:flex lg:justify-center lg:p-8">
          <Image alt="Illustration of Ecoride corporate mobility planning" height={640} priority src="/corporate-hero.svg" width={640} />
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-content-wide px-4 pb-14 md:px-6 lg:px-8">
      <SectionHeading
        description="The corporate message stays minimal, but it now makes the value clearer: predictable transport pricing, better oversight, a dedicated support team, and a cleaner way to move employees."
        eyebrow="Corporate value"
        title="Business transport works better when a local operator mindset meets cleaner planning"
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {corporateFeatureCards.map((card) => (
          <MarketingCard key={card.title} {...card} />
        ))}
      </div>
    </section>

    <section className="mx-auto max-w-content-wide px-4 pb-14 md:px-6 lg:px-8">
      <SectionHeading
        description="These outcomes turn the corporate story from a vague partnership pitch into something easier to evaluate against real transport costs and sustainability goals."
        eyebrow="Why it matters"
        title="The value is cost control, cleaner oversight, and a more sustainable transport strategy"
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {corporateOutcomeCards.map((card) => (
          <MarketingCard key={card.title} {...card} />
        ))}
      </div>
    </section>

    <section className="mx-auto max-w-content-wide px-4 pb-24 md:px-6 lg:px-8">
      <div className="surface-card rounded-card grid gap-6 p-6 md:grid-cols-[1fr,auto] md:items-center md:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/68">Corporate support</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Plan team transport with more clarity and less fleet burden</h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-white/76">
            Ecoride Corporate is built for organizations that want clearer transport costs, dashboard visibility, and a dedicated support team instead of more depreciating vehicles to manage.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <BaseButton href={`mailto:${appSettings.supportEmail}`} variant="solid-light">
            Talk to Corporate Support
          </BaseButton>
          <BaseButton href="/about#corporate-overview" variant="ghost-light">
            Corporate Overview
          </BaseButton>
        </div>
      </div>
    </section>
  </PublicLayout>
);