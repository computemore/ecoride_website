import { BaseButton } from '@/components/ui/base-button';
import { MarketingCard } from '@/components/widgets/marketing-card';
import { SectionHeading } from '@/components/widgets/section-heading';
import { corporateFeatureCards } from '@/config/site-content';
import { PublicLayout } from '@/layouts/public-layout';

export const CorporatePage = () => (
  <PublicLayout pageKey="corporate">
    <section className="mx-auto max-w-content-wide px-4 pb-12 pt-24 md:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.08fr,0.92fr] lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-white/66">Corporate</p>
          <h1 className="text-balance mt-6 max-w-4xl text-5xl font-semibold leading-[0.96] text-white md:text-7xl">
            A clearer public entry point for business-ready local transport
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/76">
            Ecoride Corporate is positioned for organizations that need reliability, local partnership, and transport that feels accountable from first contact.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <BaseButton href="/about#corporate-overview" variant="solid-light">
              Learn More
            </BaseButton>
            <BaseButton href="mailto:ecorideapp@gmail.com" variant="ghost-light">
              Contact Corporate Team
            </BaseButton>
          </div>
        </div>
        <div className="surface-card rounded-card p-7 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/68">Business mobility</p>
          <div className="mt-4 space-y-4 text-sm leading-7 text-white/76">
            <p>Phase 1 keeps the corporate story simple and indexable while leaving room for a fuller enterprise offering later.</p>
            <p>The page is built around partnership readiness, dependability, and a local support posture instead of enterprise filler language.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-content-wide px-4 pb-24 md:px-6 lg:px-8">
      <SectionHeading
        description="The first public corporate experience is intentionally lean but not vague. It communicates that Ecoride can support teams, partnerships, and dependable local transport coordination."
        eyebrow="Corporate value"
        title="Business transport works better with a local operator mindset"
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {corporateFeatureCards.map((card) => (
          <MarketingCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  </PublicLayout>
);