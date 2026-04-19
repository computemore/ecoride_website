import { MarketingCard } from '@/components/widgets/marketing-card';
import { SectionHeading } from '@/components/widgets/section-heading';
import { aboutSections } from '@/config/site-content';
import { PublicLayout } from '@/layouts/public-layout';

export const AboutPage = () => (
  <PublicLayout pageKey="about">
    <section className="mx-auto max-w-content-wide px-4 pb-12 pt-24 md:px-6 lg:px-8">
      <SectionHeading
        description="This phase keeps the About route substantial enough to support the full dropdown without splitting the site into thin, low-value pages."
        eyebrow="About"
        title="One place to understand the platform before the route map expands"
      />
    </section>

    <div className="mx-auto max-w-content-wide space-y-20 px-4 pb-24 md:px-6 lg:px-8">
      {aboutSections.map((section) => (
        <section id={section.id} key={section.id}>
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