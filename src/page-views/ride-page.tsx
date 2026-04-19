import { BaseButton } from '@/components/ui/base-button';
import { MarketingCard } from '@/components/widgets/marketing-card';
import { SectionHeading } from '@/components/widgets/section-heading';
import { appSettings } from '@/config/app-settings';
import { rideFeatureCards } from '@/config/site-content';
import { PublicLayout } from '@/layouts/public-layout';

export const RidePage = () => (
  <PublicLayout pageKey="ride">
    <section className="mx-auto max-w-content-wide px-4 pb-12 pt-24 md:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-white/66">Ride</p>
          <h1 className="text-balance mt-6 max-w-4xl text-5xl font-semibold leading-[0.96] text-white md:text-7xl">
            Safer local rides with the visibility riders actually need
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/76">
            Ecoride’s rider experience is built around verification, trip sharing, flexible payments, and the kinds of practical transport details
            that matter across Malawi.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <BaseButton href={appSettings.downloadLinks.rider.href} variant="solid-light">
              Download Rider App
            </BaseButton>
            <BaseButton href="/about#how-ecoride-works" variant="ghost-light">
              How Ecoride Works
            </BaseButton>
          </div>
        </div>
        <div className="surface-card rounded-card p-7 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/68">Rider flow</p>
          <div className="mt-4 space-y-4 text-sm leading-7 text-white/76">
            <p>Find your ride with clearer status cues, local payment familiarity, and rider-first safety signals.</p>
            <p>Trip sharing, trusted contacts, and guest ride flexibility make the platform easier to use in real situations, not just ideal ones.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-content-wide px-4 pb-24 md:px-6 lg:px-8">
      <SectionHeading
        description="The public Ride story mirrors the real rider product: safer pickups, clearer trip context, and flexible payment choices instead of a generic booking flow."
        eyebrow="Rider features"
        title="Convenience should never strip out rider confidence"
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {rideFeatureCards.map((card) => (
          <MarketingCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  </PublicLayout>
);