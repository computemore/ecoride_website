"use client";

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { BaseButton } from '@/components/ui/base-button';
import { MarketingCard } from '@/components/widgets/marketing-card';
import { SectionHeading } from '@/components/widgets/section-heading';
import { appSettings } from '@/config/app-settings';
import { rideFeatureCards } from '@/config/site-content';
import { PublicLayout } from '@/layouts/public-layout';

const AutoScrollingGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    let currentX = 0;
    let direction = 1;

    const duration = 75000; // 30 seconds for a full sweep across

    const animate = (time: number) => {
      const dt = time - lastTime;
      lastTime = time;

      const maxScroll = Math.max(0, track.scrollWidth - container.offsetWidth);

      if (maxScroll > 0) {
        const speed = maxScroll / duration; 
        currentX += speed * dt * direction;

        if (currentX >= maxScroll) {
          currentX = maxScroll;
          direction = -1;
        } else if (currentX <= 0) {
          currentX = 0;
          direction = 1;
        }

        track.style.transform = `translateX(${-currentX}px)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Mocking your processed images array (update counts/filenames as needed)
  const images = [
    // '/home-marketing/processed/01-processed-login-page-phone-otp-page.png',
    // '/home-marketing/processed/02-processed-login-page-email-pass-page.png',
    // '/home-marketing/processed/03-processed-home-page.png',
    '/home-marketing/processed/04-processed-favorite-places-pop-page.png',
    '/home-marketing/processed/05-processed-favorite-places-add-page.png',
    '/home-marketing/processed/06-processed-select-location-page.png',
    '/home-marketing/processed/07-processed-confirm-ride-page.png',
    '/home-marketing/processed/08-processed-pinpoint-page.png',
    // '/home-marketing/processed/09-processed-account-page.png',
    '/home-marketing/processed/10-processed-safety-hub-page.png',
    // '/home-marketing/processed/11-processed-login-security-page.png',
    '/home-marketing/processed/12-processed-payment-method-page.png',
    '/home-marketing/processed/13-processed-topup-page.png',
    '/home-marketing/processed/14-processed-transactions-page.png',
    // '/home-marketing/processed/15-processed-referrals-page.png',
  ];

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full min-h-[300px] overflow-hidden rounded-[18px] md:rounded-[20px] bg-slate-900/0 border-none border-slate-900/10 flex items-center"
    >
      <div ref={trackRef} className="flex py-0 w-max">
        {images.map((src, i) => (
          <Image
            key={i} 
            src={src} 
            alt={`App Screen ${i + 1}`} 
            width={360}
            height={760}
            className="h-[280px] xl:h-[420px] w-auto object-contain rounded-xl shadow-md hover:scale-[1.05] transition-transform duration-300"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
};

export const RidePage = () => (
  <PublicLayout pageKey="ride">
    <section className="relative overflow-hidden mx-auto flex min-h-screen max-w-content-wide items-center px-4 pb-4 pt-24 md:px-6 md:pt-0 lg:px-8 -mt-8 lg:-mt-12">
      <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
        {/* Hero */}
        <div className="text-center lg:text-left">
          {/* <p className="text-[16px] ml-1 font-semibold uppercase tracking-[0.26em] text-white/66">Rider App</p> */}
          <h1 className="text-2xl lg:text-5xl mt-6 max-w-4xl font-semibold leading-[0.96] text-white lg:max-w-5xl">
            Local first mobility, customer-first safety features, and digital payments.
          </h1>
          <p className="mt-6 max-w-2xl text-sm lg:text-base leading-7 text-white/80 lg:max-w-3xl">
            The Ecoride Rider App brings a distinct feel to Malawian ride-sharing, now with shared rides, live tracking and digital payment. Getting you where you need to go.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <BaseButton href={appSettings.downloadLinks.rider.href} variant="solid-light">
              Download Rider App
            </BaseButton>
            {/* <BaseButton href="/about#how-ecoride-works" variant="ghost-light">
              How Ecoride Works
            </BaseButton> */}
          </div>
        </div>
        <div className="mt-6 xl:mt-8 grid gap-4 xl:gap-2">
          {/* {homeInfoCards.length > 0 && (
            <div className="h-full">
              <MarketingCard {...homeInfoCards[0]} />
            </div>
          )} */}
          <AutoScrollingGallery />
        </div>
      </div>
    </section>
    
    {/* TODO: add focused screenshots or videos for marketing */}
    <section className="mx-auto max-w-content-wide px-4 pb-24 md:px-6 lg:px-8">
      <SectionHeading
        description="Safer pickups, clearer trip context, and flexible payment choices - innovations that make it easy for you."
        eyebrow="Rider features"
        title="With Ecoride, the Rider always comes first"
        tone="brand"
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {rideFeatureCards.map((card) => (
          <MarketingCard key={card.title} {...card} />
        ))}
      </div>
    </section>

    {/* <section className="mx-auto max-w-content-wide px-4 pb-14 md:px-6 lg:px-8">
      <SectionHeading
        description="The best rider stories feel calm and practical. Each moment below reinforces confidence without turning the page into a wall of feature copy."
        eyebrow="Rider confidence"
        title="Confidence should show up before, during, and after the trip"
        tone="brand"
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {rideConfidenceCards.map((card) => (
          <MarketingCard key={card.title} {...card} />
        ))}
      </div>
    </section> */}

    <section className="mx-auto max-w-content-wide px-4 pb-16 md:px-6 lg:px-8">
      <SectionHeading
        description="The final step in the rider journey: a seamless experience that reinforces confidence and convenience."
        eyebrow="Ready to ride?"
        title="Use the rider app built for clearer local journeys"
        tone="brand"
      />
      <div className="flex flex-wrap gap-3 md:justify-start md:items-center mt-6">
        <BaseButton href={appSettings.downloadLinks.rider.href} variant="solid-light">
          Get Rider App
        </BaseButton>
        <BaseButton href="/about#explore" variant="ghost-light">
          Explore More
        </BaseButton>
      </div>
      {/* </div> */}
    </section>
  </PublicLayout>
);