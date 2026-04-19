import { BaseButton } from '@/components/ui/base-button';
import { MarketingCard } from '@/components/widgets/marketing-card';
import { SectionHeading } from '@/components/widgets/section-heading';
import { aboutOverviewCards, aboutSections } from '@/config/site-content';
import { PublicLayout } from '@/layouts/public-layout';

export const AboutPage = () => (
  <PublicLayout pageKey="about">
    <section className="mx-auto max-w-content-wide px-4 pb-12 pt-20 md:px-6 md:pt-24 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1fr,auto] lg:items-end">
        <SectionHeading
          description="This phase keeps the About route substantial enough to support the full dropdown without splitting the site into thin, low-value pages."
          eyebrow="About"
          title="One place to understand the platform before the route map expands"
        />
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <BaseButton href="/ride" variant="solid-light">
            Start With Ride
          </BaseButton>
          <BaseButton href="/corporate" variant="ghost-light">
            See Corporate
          </BaseButton>
        </div>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {aboutOverviewCards.map((card) => (
          <MarketingCard key={card.title} {...card} />
        ))}
      </div>
    </section>

    <div className="mx-auto max-w-content-wide space-y-20 px-4 pb-24 md:px-6 lg:px-8">
      {aboutSections.map((section) => (
        <section className="section-anchor" id={section.id} key={section.id}>
          <SectionHeading eyebrow={section.eyebrow} title={section.title} description={section.description} />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {section.cards.map((card) => (
              <MarketingCard key={`${section.id}-${card.title}`} {...card} />
            ))}
          </div>
        </section>
      ))}
    </div>
  </PublicLayout>
);