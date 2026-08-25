"use client";

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { BaseButton } from '@/components/ui/base-button';
import { MarketingCard } from '@/components/widgets/marketing-card';
import { SectionHeading } from '@/components/widgets/section-heading';
import { appSettings } from '@/config/app-settings';
import { driveFeatureCards } from '@/config/site-content';
import { PublicLayout } from '@/layouts/public-layout';
import { useDriverDownloadUrl } from '@/hooks/use-driver-download-url';

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
    '/home-marketing/marketing-driver/marketing_3.png', 
    '/home-marketing/marketing-driver/marketing_4.png',
    '/home-marketing/marketing-driver/marketing_5.png',
    '/home-marketing/marketing-driver/marketing_6.png',
    '/home-marketing/marketing-driver/marketing_7.png',
    '/home-marketing/marketing-driver/marketing_8.png',
    '/home-marketing/marketing-driver/marketing_9.png',
  ];

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full min-h-[300px] overflow-hidden 0rounded-[8px] bg-slate-900/0 border-none border-slate-900/10 flex items-center"
    >
      <div ref={trackRef} className="flex gap-6 py-0 w-max">
        {images.map((src, i) => (
          <Image
            key={i} 
            src={src} 
            alt={`App Screen ${i + 1}`} 
            width={360}
            height={760}
            className="h-[360px] xl:h-[480px] w-auto object-contain rounded-[8px] shadow-md hover:scale-[1.05] transition-transform duration-300"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
};

export const DrivePage = () => {
  const driverDownloadUrl = useDriverDownloadUrl();

  return (
    <PublicLayout pageKey="drive">
      <section className="relative overflow-hidden mx-auto flex min-h-screen max-w-content-wide items-center px-4 pb-4 pt-0 md:px-6 md:pt-0 lg:px-8 -mt-12 lg:-mt-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div className="mt-0 xl:mt-8 grid gap-4 xl:gap-2">
            {/* {homeInfoCards.length > 0 && (
              <div className="h-full">
                <MarketingCard {...homeInfoCards[0]} />
              </div>
            )} */}
            <AutoScrollingGallery />
          </div>
          <div className="text-center lg:text-left">
            {/* <p className="text-[16px] ml-1 font-semibold uppercase tracking-[0.26em] text-white/66">Driver App</p> */}
            <h1 className="text-2xl lg:text-[2.8rem] mt-6 max-w-4xl font-semibold leading-[0.96] text-white lg:max-w-5xl">
              Time is money, and Ecoride Driver gets you the best of both.
            </h1>
            <p className="mt-4 max-w-2xl text-[14px] lg:text-base leading-7 text-white/80 lg:max-w-3xl">
              The driver experience is designed and engineered around your time and money - featuring real-time demand indicators, smooth navigation, and earnings breakdowns!
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3 lg:justify-start">
              <BaseButton href={driverDownloadUrl} variant="solid-light">
                Download Driver App
              </BaseButton>
              {/* <BaseButton href="/about#partners" variant="ghost-light">
                Explore Opportunities
              </BaseButton> */}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-content-wide px-4 pb-24 md:px-6 lg:px-8 lg:mb-32">
        <SectionHeading
          description="Our promise is: earning flexibility, responsive demand, support access, and transparent driver readiness."
          eyebrow="Driver features"
          title="Clear earning potential - earn up to MWK100,000/day with ecoride"
          tone="brand"
        />
        <div className="mt-4 grid gap-5 md:grid-cols-3">
          {driveFeatureCards.map((card) => (
            <MarketingCard key={card.title} {...card} />
          ))}
        </div>
        <div className="flex flex-wrap gap-3 md:justify-start md:items-center mt-8">
          <BaseButton href={driverDownloadUrl} variant="solid-light">
            Get Driver App
          </BaseButton>
          {/* <BaseButton href="/about#partners" variant="ghost-light">
            Partner With Ecoride
          </BaseButton> */}
        </div>
      </section>

      {/* <section className="mx-auto max-w-content-wide px-4 pb-14 md:px-6 lg:px-8">
        <SectionHeading
          description="The driver message stays simple: clearer onboarding, visible support, and an earning flow that feels grounded in daily work."
          eyebrow="Driver support"
          title="A better driver story is built on readiness, earnings, and trust"
          tone="brand"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {driveSupportCards.map((card) => (
            <MarketingCard key={card.title} {...card} />
          ))}
        </div>
      </section> */}

      {/* <section className="mx-auto max-w-content-wide px-4 pb-16 md:px-6 lg:px-8"> */}
        {/* <SectionHeading
          description="The final step in the driver journey: a seamless experience that reinforces confidence and convenience."
          eyebrow="Ready to earn?"
          title="Download the driver app for Android/iOS and get started"
          tone="brand"
        /> */}

        {/* </div> */}
      {/* </section> */}
      {/* <section className="mx-auto max-w-content-wide px-4 pb-24 md:px-6 lg:px-8">
        <div className="surface-card rounded-card grid gap-6 p-6 md:grid-cols-[1fr,auto] md:items-center md:p-8">
          <div>
            <p className="text-[14px] font-semibold uppercase tracking-[0.24em] text-white/68">Ready to drive</p>
            <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">Bring your schedule, your readiness, and your next earning window</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/76 md:text-base md:leading-8">
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
      </section> */}
    </PublicLayout>
  )
};