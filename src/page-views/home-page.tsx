"use client";

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { BaseButton } from '@/components/ui/base-button';
import { ArrowRightIcon, SiteTitleIconDark } from '@/icons';
import { PublicLayout } from '@/layouts/public-layout';
import { MarketingCard } from '@/components/widgets/marketing-card';
import { MapOffice } from '@/components/widgets/map-office';
import { SectionHeading } from '@/components/widgets/section-heading';
import { appSettings } from '@/config/app-settings';
import { homeInfoCards } from '@/config/site-content';

const AutoScrollingGallery = ({ images }: { images: string[] }) => {
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

    const duration = 10000 * images.length; // 30 seconds for a full sweep across

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
  }, [images.length]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full min-h-[300px] overflow-hidden rounded-[18px] md:rounded-[20px] bg-slate-900/0 border-none border-slate-900/10 flex items-center"
    >
      <div ref={trackRef} className="flex gap-4 px-4 py-4 w-max">
        {images.map((src, i) => (
          <Image
            key={i} 
            src={src} 
            alt={`App Screen ${i + 1}`} 
            width={360}
            height={760}
            className="h-[280px] xl:h-[320px] w-auto object-contain rounded-xl shadow-md hover:scale-[1.05] transition-transform duration-300"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
};

export const HomePage = () => {
  const [showImage, setShowImage] = useState(false);

  const driverImages = [
    // '/home-marketing/processed/01-processed-login-page-phone-otp-page.png',
    // '/home-marketing/processed/02-processed-login-page-email-pass-page.png',
    // '/home-marketing/processed/03-processed-home-page.png',
    '/home-marketing/processed-driver/01_login_page.png', 
    '/home-marketing/processed-driver/02_create_account.png',
    '/home-marketing/processed-driver/03_home_page.png',
    '/home-marketing/processed-driver/05_driver_navigation.png',
    '/home-marketing/processed-driver/06_in_ride_chat.png', 
    '/home-marketing/processed-driver/07_ride_cash_collection.png',
    '/home-marketing/processed-driver/08_driver_dashboard.png',
    '/home-marketing/processed-driver/09_account_page.png',
  ];

  // Mocking your processed images array (update counts/filenames as needed)
  const riderImages = [
    '/home-marketing/processed/01-processed-login-page-phone-otp-page.png',
    '/home-marketing/processed/02-processed-login-page-email-pass-page.png',
    '/home-marketing/processed/03-processed-home-page.png',
    '/home-marketing/processed/04-processed-favorite-places-pop-page.png',
    '/home-marketing/processed/05-processed-favorite-places-add-page.png',
    '/home-marketing/processed/06-processed-select-location-page.png',
    '/home-marketing/processed/07-processed-confirm-ride-page.png',
    '/home-marketing/processed/08-processed-pinpoint-page.png',
    '/home-marketing/processed/09-processed-account-page.png',
    '/home-marketing/processed/10-processed-safety-hub-page.png',
    '/home-marketing/processed/11-processed-login-security-page.png',
    '/home-marketing/processed/12-processed-payment-method-page.png',
    '/home-marketing/processed/13-processed-topup-page.png',
    '/home-marketing/processed/14-processed-transactions-page.png',
    '/home-marketing/processed/15-processed-referrals-page.png',
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PublicLayout pageKey="home" tone="light">
      <section className="relative overflow-hidden mx-auto flex min-h-screen max-w-content-wide items-center px-4 pb-4 pt-0 md:px-6 md:pt-0 lg:px-8 -mt-8 lg:-mt-12">
        {/* Hero */}
        <div
          className={`w-full transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] origin-top md:origin-left ${
            showImage
              ? 'transform -translate-y-[15vh] scale-90 md:translate-y-0 md:scale-[0.85] xl:-translate-x-[10%] lg:-translate-x-[15%]'
              : 'transform translate-y-0 scale-100 translate-x-0'
          }`}
        >
          <div className="text-center">
            <h1 className="text-balance mx-auto mt-0 max-w-5xl text-5xl font-medium leading-[0.92] text-slate-950/95 md:text-7xl lg:text-[3.8rem] xl:text-[6.8rem]">
              <SiteTitleIconDark className='w-[220px] xl:w-[460px] lg:w-[300px] inline-flex items-center justify-center'/>
              <br/>a ride simplified.
            </h1>
            <p className="mx-auto mt-4 lg:mt-6 max-w-3xl lg:max-w-xl text-[16px] leading-7 md:leading-10 text-slate-950/85">
              A local-first ride sharing and car rental platform by Malawians, for Malawians, with support for corporates
            </p>
            <div 
              className={`mt-4 md:mt-6 lg:mt-6 flex flex-wrap justify-center gap-3 ${
                showImage ? 'scale-111 md:translate-y-0 md:scale-[1.18]' : ''
              }`}
            >
              <BaseButton href={appSettings.downloadLinks.rider.href} variant="solid-green">
                Download Rider App
              </BaseButton>
              <BaseButton href="/corporate" variant="ghost-dark">
                Explore Corporate
              </BaseButton>
            </div>
          </div>
        </div>

        {/* Framed Screenshot Animation */}
        <a
          href="#"
          className={`absolute bottom-0 mb-8 left-0 right-0 pb-8 md:pb-0 md:left-auto md:right-8 md:top-1/2 top-3/5 flex justify-center z-10 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            showImage
              ? 'opacity-100 translate-y-0 md:-translate-y-1/2 md:translate-x-0'
              : 'opacity-0 translate-y-full md:-translate-y-1/2 md:translate-x-full'
          }`}
        >
          <Image
            src="/framed-screenshots/framed-home-page.png"
            alt="Ecoride App Preview"
            width={900}
            height={1800}
            className="w-auto h-[32vh] md:h-auto md:w-[40vw] max-w-[450px] object-contain drop-shadow-2xl hover:scale-[1.03] hover:-translate-y-2 transition-all duration-300"
          />
        </a>
      </section>

    {/* rider app section */}
    <section className="mx-auto max-w-content-wide px-4 pb-24 md:px-6 lg:px-8">
      <SectionHeading
        description="Designed and engineered to take you wherever you want to go"
        eyebrow="The Ecoride rider app"
        title="Explore the ecoride rider app on both iOS and Android"
      />
      <div className="mt-6 xl:mt-8 grid gap-4 xl:gap-2 lg:grid-cols-[1fr,2fr]">
        {homeInfoCards.length > 0 && (
          <div className="h-full">
            <MarketingCard {...homeInfoCards[0]} />
          </div>
        )}
        <AutoScrollingGallery images={riderImages} />
      </div>
    </section>

    {/* driver app and program section */}
    <section className="mx-auto max-w-content-wide px-4 pb-14 md:px-6 lg:px-8">
      <SectionHeading
        description="Your money, your way - we understand, your time matters"
        eyebrow="Want to earn?"
        title="Enroll for our driver program and start earning with ecoride"
        forceAlignment='right'
      />
      <div className="mt-6 xl:mt-8 grid gap-4 xl:gap-2 lg:grid-cols-[2fr,1fr]">
        <AutoScrollingGallery images={driverImages} />
        {homeInfoCards.length > 1 && (
          <div className="h-full">
            <MarketingCard {...homeInfoCards[1]} />
          </div>
        )}
      </div>
    </section>

    {/* above the footer content */}
    <section className="mx-auto max-w-content-wide px-4 pb-24 md:px-6 lg:px-8">
      <div className="surface-card rounded-card grid gap-8 p-7 md:grid-cols-[1.2fr,0.8fr] md:p-10">
        <div>
          <p className="text-[14px] font-semibold uppercase tracking-[0.24em] text-slate-950/85">Local credibility</p>
          <h2 className="mt-4 text-2xl font-medium text-slate-950/95 md:text-4xl">Grounded in Malawi, built for the journeys people already make</h2>
          {/* <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-950/85 md:text-base md:leading-8"> */}
            {/* The new website treats Ecoride as a platform for riders, drivers, and teams without hiding the fact that real local transport depends on */}
            {/* practical support, local contact, and clear expectations. */}
          {/* </p> */}
          <div className="mt-6 flex flex-wrap gap-3">
            <BaseButton href="/about" variant="solid-dark">
              About Ecoride
            </BaseButton>
            <BaseButton href="/drive" variant="ghost-dark">
              Driver Opportunities
            </BaseButton>
          </div>
        </div>
        <div className="w-full md:col-span-2 flex flex-row rounded-[18px]">
          <MapOffice />
          <div className="rounded-[18px] min-w-[300px] p-6">
            <p className="text-[16px] font-semibold text-slate-950">Visit or call</p>
            <div className="mt-4 space-y-2 text-[16px] leading-6 text-slate-950/80 sm:text-sm sm:leading-7">
              {appSettings.addressLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
              {appSettings.phoneNumbers.map((phone) => (
                <p key={phone}>{phone}</p>
              ))}
              <a 
                className="rounded-[18px] text-[15px] bg-slate-950 inline-flex break-all items-center gap-2 pl-3 pr-2 text-white" 
                href={`mailto:${appSettings.supportEmail}`}
              >
                {appSettings.supportEmail}
                <ArrowRightIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>

    {/* office location section
    <section className="mx-auto max-w-content-wide px-4 pb-24 md:px-6 lg:px-8">
      <MapOffice />
    </section> */}
    </PublicLayout>
  );
};