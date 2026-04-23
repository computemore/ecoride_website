import { BaseButton } from '@/components/ui/base-button';
import { MarketingCard } from '@/components/widgets/marketing-card';
import { SectionHeading } from '@/components/widgets/section-heading';
import { appSettings } from '@/config/app-settings';
import { rideConfidenceCards, rideFeatureCards } from '@/config/site-content';
import { PublicLayout } from '@/layouts/public-layout';

export const RidePage = () => (
  <PublicLayout pageKey="ride">
    <section className="mx-auto max-w-content-wide px-4 pb-12 pt-4 md:px-6 md:pt-24 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
        <div className="text-center lg:text-left">
          <p className="text-[14px] font-semibold uppercase tracking-[0.26em] text-white/66">Ride</p>
          <h1 className="text-balance mt-6 max-w-4xl text-4xl font-semibold leading-[0.96] text-white md:text-7xl lg:max-w-5xl">
            Safer local rides with the visibility riders actually need
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/76 lg:max-w-3xl">
            Ecoride’s rider experience is built around verification, trip sharing, flexible payments, and the kinds of practical transport details
            that matter across Malawi.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <BaseButton href={appSettings.downloadLinks.rider.href} variant="solid-light">
              Download Rider App
            </BaseButton>
            <BaseButton href="/about#how-ecoride-works" variant="ghost-light">
              How Ecoride Works
            </BaseButton>
          </div>
        </div>
        <div className="surface-card rounded-card p-7 md:p-8">
          <p className="text-[14px] font-semibold uppercase tracking-[0.24em] text-white/68">Rider flow</p>
          <div className="mt-5 grid gap-3">
            {['Verify the pickup', 'Share the journey', 'Pay the way that fits'].map((step) => (
              <div className="rounded-card border border-white/10 bg-black/10 p-4" key={step}>
                <p className="text-[14px] font-semibold text-white sm:text-sm">{step}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-4 text-[14px] leading-6 text-white/76 sm:text-sm sm:leading-7">
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

    <section className="mx-auto max-w-content-wide px-4 pb-14 md:px-6 lg:px-8">
      <SectionHeading
        description="The best rider stories feel calm and practical. Each moment below reinforces confidence without turning the page into a wall of feature copy."
        eyebrow="Rider confidence"
        title="Confidence should show up before, during, and after the trip"
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {rideConfidenceCards.map((card) => (
          <MarketingCard key={card.title} {...card} />
        ))}
      </div>
    </section>

    <section className="mx-auto max-w-content-wide px-4 pb-24 md:px-6 lg:px-8">
      <div className="surface-card rounded-card grid gap-6 p-6 md:grid-cols-[1fr,auto] md:items-center md:p-8">
        <div>
          <p className="text-[14px] font-semibold uppercase tracking-[0.24em] text-white/68">Ready to ride</p>
          <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">Use the rider app built for clearer local journeys</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/76 md:text-base md:leading-8">
            Start with safer trip verification, flexible payments, and a public platform that explains the service without the noise.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <BaseButton href={appSettings.downloadLinks.rider.href} variant="solid-light">
            Get Rider App
          </BaseButton>
          <BaseButton href="/about#explore" variant="ghost-light">
            Explore More
          </BaseButton>
        </div>
      </div>
    </section>
  </PublicLayout>
);