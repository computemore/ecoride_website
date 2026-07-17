"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { BaseButton } from '@/components/ui/base-button';
import { MarketingCard } from '@/components/widgets/marketing-card';
import { SectionHeading } from '@/components/widgets/section-heading';
import { appSettings } from '@/config/app-settings';
import type { CardContent } from '@/config/site-content';
import { CheckCircleIcon, SiteTitleIconDark } from '@/icons';
import { PublicLayout } from '@/layouts/public-layout';
import { useDriverDownloadUrl } from '@/hooks/use-driver-download-url';

const payoutCards = [
  {
    eyebrow: 'Cadence',
    title: 'Know when digital earnings move',
    description:
      'Completed digital trips are reviewed, cleared, and released through the active Ecoride payout window shown to drivers.',
    bullets: [
      'Digital trip earnings are tracked in your driver balance',
      'Cleared balances move during the payout window',
      'Payment provider timing can affect exact arrival',
    ],
    variation: 'green',
  },
  {
    eyebrow: 'Cash',
    title: 'Cash trips work differently',
    description:
      'When a rider pays cash, the money is collected during the trip. Digital payout timing only applies to trips paid through the app.',
    bullets: [
      'Cash trips are visible in your activity history',
      'Digital trips move through settlement before payout',
      'Adjustments can apply when a trip needs review',
    ],
    variation: 'red',
  },
  {
    eyebrow: 'Methods',
    title: 'Keep your payout method current',
    description:
      'Your selected payout method tells Ecoride where to send cleared digital earnings. Keep the details accurate before the next payout window.',
    bullets: [
      'Add payout details from the driver app',
      'Set the method you want to use as default',
      'Review names and numbers before saving',
    ],
    variation: 'blue',
  },
] satisfies CardContent[];

const payoutFlow = [
  {
    label: 'Trip paid digitally',
    description: 'The rider pays in the app, and the completed trip is attached to your driver earnings.',
  },
  {
    label: 'Balance is reviewed',
    description: 'Ecoride reconciles completed digital trips, fees, support adjustments, and any trip review items.',
  },
  {
    label: 'Payout is released',
    description: 'Cleared digital earnings are sent to the payout method selected in your driver account.',
  },
  {
    label: 'Method receives funds',
    description: 'Your mobile money or bank provider finishes delivery according to its own processing timing.',
  },
] as const;

const methodSteps = [
  'Open the Ecoride Driver app and go to your account area.',
  'Choose Payments or Payout methods.',
  'Add the mobile money or bank details you want to receive payouts through.',
  'Review the account name, number, and provider before saving.',
  'Set the new method as your default method for future payouts.',
] as const;

export const PaymentsInfoPage = () => {
  const [showImage, setShowImage] = useState(false);
  const payoutMethodsVideoUrl = appSettings.media.driverPayoutMethodsVideoUrl;
  const driverDownloadUrl = useDriverDownloadUrl();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <PublicLayout pageKey="payments" tone="light">
      <section className="relative overflow-hidden mx-auto flex min-h-screen max-w-content-wide items-center px-4 pb-4 pt-0 md:px-6 md:pt-0 lg:px-8 -mt-8 lg:-mt-12">
        <div
          className={`w-full transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] origin-top md:origin-left ${
            showImage
              ? 'transform -translate-y-[15vh] scale-90 md:translate-y-0 md:scale-[0.85] xl:-translate-x-[10%] lg:-translate-x-[15%]'
              : 'transform translate-y-0 scale-100 translate-x-0'
          }`}
        >
          <div className="text-center">
            <h1 className="text-balance mx-auto mt-0 max-w-5xl text-5xl font-medium leading-[0.92] text-slate-950/95 md:text-7xl lg:text-[3.6rem] xl:text-[5.8rem]">
              <SiteTitleIconDark className="w-[190px] xl:w-[400px] lg:w-[260px] inline-flex items-center justify-center" />
              <br />
              driver payments.
            </h1>
            <p className="mx-auto mt-4 lg:mt-6 max-w-3xl lg:max-w-xl text-[16px] leading-7 md:leading-10 text-slate-950/85">
              Understand payout cadence, digital payouts, and how to keep your payout method ready before the next earning window.
            </p>
            <div
              className={`mt-4 md:mt-6 lg:mt-6 flex flex-wrap justify-center gap-3 ${
                showImage ? 'scale-111 md:translate-y-0 md:scale-[1.18]' : ''
              }`}
            >
              <BaseButton href="#payout-methods" variant="solid-green">
                Watch payout guide
              </BaseButton>
              <BaseButton href={driverDownloadUrl} variant="ghost-dark">
                Download Driver App
              </BaseButton>
            </div>
          </div>
        </div>

        <a
          className={`absolute bottom-0 -mt-0 mb-8 left-0 right-0 pb-8 md:pb-0 md:left-auto md:right-8 md:top-1/2 top-3/5 flex justify-center z-10 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            showImage
              ? 'opacity-100 translate-y-0 md:-translate-y-1/2 md:translate-x-0'
              : 'opacity-0 translate-y-full md:-translate-y-1/2 md:translate-x-full'
          }`}
          href="#payout-methods"
        >
          <Image
            alt="Ecoride Driver dashboard preview"
            className="w-auto h-[32vh] md:h-auto md:w-[40vw] max-w-[450px] object-contain drop-shadow-2xl hover:scale-[1.03] hover:-translate-y-2 transition-all duration-300"
            height={760}
            loading="eager"
            src="/home-marketing/processed-driver/08_driver_dashboard.png"
            width={360}
          />
        </a>
      </section>

      <section className="mx-auto max-w-content-wide px-4 pb-24 md:px-6 lg:px-8 my-12">
        <SectionHeading
          description="Driver payments are easier to trust when the difference between cash collection, digital settlement, and payout method setup is clear."
          eyebrow="Payment basics"
          title="The money flow, from completed trip to payout method"
        />
        <div className="mt-4 grid gap-5 md:grid-cols-3 xl:mt-8">
          {payoutCards.map((card) => (
            <MarketingCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-content-wide px-4 pb-14 md:px-6 lg:px-8 my-12">
        <SectionHeading
          description="Digital payouts follow a clear path in the driver app: paid trip, reviewed balance, released payout, then provider delivery."
          eyebrow="Digital payouts"
          forceAlignment="right"
          title="How app-paid trips become money in your selected account"
        />
        <div className="mt-6 grid gap-4 lg:grid-cols-4">
          {payoutFlow.map((step, index) => (
            <article className="surface-card-light rounded-[var(--radius-card)] p-5 text-left" key={step.label}>
              <p className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-slate-950 text-[14px] font-semibold text-white">
                {index + 1}
              </p>
              <h3 className="mt-4 text-base font-semibold text-slate-950">{step.label}</h3>
              <p className="mt-2 text-[13px] leading-6 text-slate-950/72">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-content-wide px-4 pb-24 md:px-6 lg:px-8 my-16" id="payout-methods">
        <SectionHeading
          centered
          description="Use the recording to follow the exact path in the driver app, then confirm the new method before your next payout window."
          eyebrow="How to add payout methods"
          title="Update where your digital earnings are paid"
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr,0.85fr] lg:items-center">
          <div className="surface-card-light overflow-hidden rounded-[var(--radius-card)] p-3">
            {payoutMethodsVideoUrl ? (
              <video
                className="aspect-[9/16] max-h-[720px] w-full rounded-[18px] bg-slate-950 object-contain"
                controls
                playsInline
                preload="metadata"
                src={payoutMethodsVideoUrl}
              >
                Your browser does not support this video.
              </video>
            ) : (
              <div className="flex aspect-[9/16] max-h-[720px] w-full flex-col items-center justify-center rounded-[18px] bg-slate-950 px-6 text-center">
                <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-white/58">Recording slot</p>
                <p className="mt-3 max-w-sm text-sm leading-7 text-white/78">
                  Add the R2 object URL to NEXT_PUBLIC_DRIVER_PAYOUT_METHODS_VIDEO_URL to show the payout method recording here.
                </p>
              </div>
            )}
          </div>

          <div className="surface-card-light rounded-[var(--radius-card)] p-6 text-left md:p-8">
            <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-slate-950/72">In the app</p>
            <h3 className="mt-3 text-2xl font-medium text-slate-950 md:text-3xl">Add the method, then make it default</h3>
            <div className="mt-5 grid gap-4">
              {methodSteps.map((step) => (
                <div className="flex items-start gap-3" key={step}>
                  <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#2c9c8e]" />
                  <p className="text-sm leading-7 text-slate-950/76">{step}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-[8px] bg-slate-950 px-4 py-3 text-sm leading-7 text-white/82">
              Keep the old method active until any pending payout is complete, then remove details you no longer want to use.
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};
