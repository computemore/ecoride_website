import { BaseButton } from '@/components/ui/base-button';
import { ArrowRightIcon } from '@/icons';
import { PublicLayout } from '@/layouts/public-layout';
import { MarketingCard } from '@/components/widgets/marketing-card';
import { SectionHeading } from '@/components/widgets/section-heading';
import { appSettings } from '@/config/app-settings';
import { homeAboutCards, homeJourneyCards, homeSignalStats } from '@/config/site-content';

export const HomePage = () => (
  <PublicLayout pageKey="home">
    <section className="mx-auto flex min-h-[76vh]li max-w-content-wide items-center px-4 pb-14 pt-20 md:px-6 md:pt-24 lg:px-8">
      <div className="w-full">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/66">Local-first mobility in Malawi</p>
          <h1 className="text-balance mx-auto mt-6 max-w-5xl text-5xl font-semibold leading-[0.92] text-white md:text-7xl lg:text-[5.4rem]">
            Welcome to Ecoride - A Ride simplified
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/78 md:text-2xl md:leading-10">
            A local-first ride sharing platform by Malawians, for Malawians, with clearer paths for riders, drivers, and businesses.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <BaseButton href={appSettings.downloadLinks.rider.href} variant="solid-light">
              Download Rider App
            </BaseButton>
            <BaseButton href="/corporate" variant="ghost-light">
              Explore Corporate
            </BaseButton>
          </div>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-content-wide px-4 pb-14 md:px-6 lg:px-8">
      <SectionHeading
        centered
        description="The new public site keeps the message simple above the fold, then grounds the brand in the same trust, reliability, and support cues that made the original presence feel local and real."
        eyebrow="About Ecoride"
        title="Local transport should feel clearer, safer, and easier to trust"
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {homeAboutCards.map((card) => (
          <MarketingCard key={card.title} {...card} />
        ))}
      </div>
    </section>

    <section className="mx-auto max-w-content-wide px-4 pb-14 md:px-6 lg:px-8">
      <SectionHeading
        description="Each public route now gives its audience a cleaner first impression instead of forcing every user through the same generic transport story."
        eyebrow="Choose your path"
        title="Three clear journeys, one local-first platform"
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {homeJourneyCards.map((card) => (
          <MarketingCard key={card.title} {...card} />
        ))}
      </div>
    </section>

    <section className="mx-auto max-w-content-wide px-4 pb-24 md:px-6 lg:px-8">
      <div className="surface-card rounded-card grid gap-8 p-7 md:grid-cols-[1.2fr,0.8fr] md:p-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/68">Local credibility</p>
          <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">Grounded in Blantyre, built for the journeys people already make</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/76">
            The new website treats Ecoride as a platform for riders, drivers, and teams without hiding the fact that real local transport depends on
            practical support, local contact, and clear expectations.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <BaseButton href="/about" variant="solid-light">
              About Ecoride
            </BaseButton>
            <BaseButton href="/drive" variant="ghost-light">
              Driver Opportunities
            </BaseButton>
          </div>
        </div>
        <div className="rounded-card border border-white/12 bg-black/10 p-6">
          <p className="text-sm font-semibold text-white">Visit or call</p>
          <div className="mt-4 space-y-2 text-sm leading-7 text-white/74">
            {appSettings.addressLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
            {appSettings.phoneNumbers.map((phone) => (
              <p key={phone}>{phone}</p>
            ))}
            <a className="inline-flex items-center gap-2 pt-3 text-white" href={`mailto:${appSettings.supportEmail}`}>
              {appSettings.supportEmail}
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  </PublicLayout>
);