import { BaseButton } from '@/components/ui/base-button';
import { MarketingCard } from '@/components/widgets/marketing-card';
import { SectionHeading } from '@/components/widgets/section-heading';
import { appSettings } from '@/config/app-settings';
import { driveFeatureCards } from '@/config/site-content';
import { PublicLayout } from '@/layouts/public-layout';

export const DrivePage = () => (
  <PublicLayout pageKey="drive">
    <section className="mx-auto max-w-content-wide px-4 pb-12 pt-24 md:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-white/66">Drive</p>
          <h1 className="text-balance mt-6 max-w-4xl text-5xl font-semibold leading-[0.96] text-white md:text-7xl">
            Earn with Ecoride on a schedule that still feels like yours
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/76">
            The driver experience is centered on earning clarity, flexible availability, real-time demand, and support structures that stay visible.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <BaseButton href={appSettings.downloadLinks.driver.href} variant="solid-light">
              Download Driver App
            </BaseButton>
            <BaseButton href="/about#partners" variant="ghost-light">
              Explore Opportunities
            </BaseButton>
          </div>
        </div>
        <div className="surface-card rounded-card p-7 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/68">Driver path</p>
          <div className="mt-4 space-y-4 text-sm leading-7 text-white/76">
            <p>Drive fast or luxury classes, manage your activity, and stay close to live trip requests without a cluttered driver story.</p>
            <p>The phase-one website positions the driver app around earning, safety, and onboarding readiness rather than vague recruitment slogans.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-content-wide px-4 pb-24 md:px-6 lg:px-8">
      <SectionHeading
        description="The marketing layer mirrors the strongest parts of the driver app: flexibility, responsive demand, support access, and transparent driver readiness."
        eyebrow="Driver features"
        title="Clear earning stories beat generic driver recruitment"
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {driveFeatureCards.map((card) => (
          <MarketingCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  </PublicLayout>
);