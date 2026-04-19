import { BaseButton } from '@/components/ui/base-button';
import { MarketingCard } from '@/components/widgets/marketing-card';
import { SectionHeading } from '@/components/widgets/section-heading';
import { appSettings } from '@/config/app-settings';
import { driveFeatureCards, driveSupportCards } from '@/config/site-content';
import { PublicLayout } from '@/layouts/public-layout';

export const DrivePage = () => (
  <PublicLayout pageKey="drive">
    <section className="mx-auto max-w-content-wide px-4 pb-12 pt-20 md:px-6 md:pt-24 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
        <div className="text-center lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-white/66">Drive</p>
          <h1 className="text-balance mt-6 max-w-4xl text-5xl font-semibold leading-[0.96] text-white md:text-7xl">
            Earn with Ecoride on a schedule that still feels like yours
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/76">
            The driver experience is centered on earning clarity, flexible availability, real-time demand, and support structures that stay visible.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
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
          <div className="mt-5 grid gap-3">
            {['Go online when ready', 'Respond to live requests', 'Keep support in view'].map((step) => (
              <div className="rounded-card border border-white/10 bg-black/10 p-4" key={step}>
                <p className="text-sm font-semibold text-white">{step}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-4 text-sm leading-7 text-white/76">
            <p>Drive fast or luxury classes, manage your activity, and stay close to live trip requests without a cluttered driver story.</p>
            <p>The public story positions the driver app around earning, safety, and onboarding readiness rather than vague recruitment slogans.</p>
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

    <section className="mx-auto max-w-content-wide px-4 pb-14 md:px-6 lg:px-8">
      <SectionHeading
        description="The driver message stays simple: clearer onboarding, visible support, and an earning flow that feels grounded in daily work."
        eyebrow="Driver support"
        title="A better driver story is built on readiness, earnings, and trust"
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {driveSupportCards.map((card) => (
          <MarketingCard key={card.title} {...card} />
        ))}
      </div>
    </section>

    <section className="mx-auto max-w-content-wide px-4 pb-24 md:px-6 lg:px-8">
      <div className="surface-card rounded-card grid gap-6 p-6 md:grid-cols-[1fr,auto] md:items-center md:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/68">Ready to drive</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Bring your schedule, your readiness, and your next earning window</h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-white/76">
            The driver app keeps onboarding, requests, and support visible enough to make day-to-day work feel more controlled.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <BaseButton href={appSettings.downloadLinks.driver.href} variant="solid-light">
            Get Driver App
          </BaseButton>
          <BaseButton href="/about#partners" variant="ghost-light">
            Partner With Ecoride
          </BaseButton>
        </div>
      </div>
    </section>
  </PublicLayout>
);