# Animated Screenshots Concept for Driver and Rider Info Cards

**Version:** 1.0.0.7
**Production URL:** `https://ecoridemw.com`  
**Idea Inception Date:** April 24, 2026
**Last Updated:** April 24, 2026
**Idea Status:** <span style="color: red; font-weight: bold;">Not Started</span>

This document provides a complete reference for all APIs in the Ecoride platform.

## Contents

- [Animated Screenshots Concept for Driver and Rider Info Cards](#animated-screenshots-concept-for-driver-and-rider-info-cards)
  - [Contents](#contents)
  - [1. Performance and LCP (The Biggest Factor)](#1-performance-and-lcp-the-biggest-factor)
  - [2. Device Battery and Data Usage](#2-device-battery-and-data-usage)
  - [3. Mobile Autoplay Restrictions](#3-mobile-autoplay-restrictions)
  - [Here is a conceptual example of how we can build a lightweight "App Flow" component:](#here-is-a-conceptual-example-of-how-we-can-build-a-lightweight-app-flow-component)
  - [When would video make sense?](#when-would-video-make-sense)
  - [Data flow for each card](#data-flow-for-each-card)
    - [Card 1 - Ride Booking Flow](#card-1---ride-booking-flow)
    - [Card 2 - Payment Flows](#card-2---payment-flows)
  - [Card 3 - Safety and Ride-Sharing Flows](#card-3---safety-and-ride-sharing-flows)

---

Given that we are already struggling with Large Contentful Paint (LCP) on mobile, and seeing that the target audience is in Malawi (where internet data constraints and varied mobile device capabilities are common considerations), we can use static images that animate/cross-fade into one another rather than actual video files. Why?

## 1. Performance and LCP (The Biggest Factor)

- Images: If we use highly optimized WebP or AVIF images, we can load the first image in the sequence immediately (using Next.js <Image priority /> if it's near the top). This guarantees a blazing-fast LCP score. we can then lazy-load the subsequent images in the background before animating them in.

- Videos: Even a well-compressed MP4 or WebM video requires the browser to download the video container, parse the metadata, and start the decoding process before it paints the first frame. This almost always severely penalizes our LCP and mobile SEO scores.

## 2. Device Battery and Data Usage

- Images: Fading between 3 or 4 static screenshots (e.g., each being 50kb) takes very little data (200kb total) and zero hardware decoding effort.

- Videos: Videos require continuous hardware/software decoding, draining battery faster on low-end mobile devices and consuming significantly more data (often 2MB+ for a short clip).

## 3. Mobile Autoplay Restrictions

- Mobile browsers (Safari/Chrome) have strict autoplay policies. Even if we set a video to muted playsinline autoplay, browsers on "Low Power Mode" or under certain network conditions will block the video from playing, leaving the user staring at a frozen frame or a play button. Image animations via CSS/JS will always run regardless of power saving modes.

> ### How to implement the "Animated Images" approach efficiently?
> The most performant way to build this in Next.js is to stack the images on top of each other using CSS absolute positioning, and fade their opacity in and out.

## Here is a conceptual example of how we can build a lightweight "App Flow" component:

```typescript
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const APP_SCREENS = [
  '/images/flow-1-enter-destination.webp',
  '/images/flow-2-choose-ride.webp',
  '/images/flow-3-driver-arriving.webp',
];

export function AppFlowAnimation() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Change image every 3 seconds
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % APP_SCREENS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-[300px] h-[600px] overflow-hidden rounded-[40px] border-[8px] border-slate-900 shadow-xl">
      {APP_SCREENS.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt={`App flow step ${index + 1}`}
          fill
          className={`object-cover transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          // Only eagerly load the FIRST image for perfect LCP. Lazy load the rest.
          priority={index === 0}
          loading={index === 0 ? 'eager' : 'lazy'}
        />
      ))}
    </div>
  );
}
```

## When would video make sense?

The only time we should use video for this is if we need to show complex, fluid micro-interactions (like a map specifically panning while a car icon drives smoothly). If we must use video, we wait to render the <video> tag until the user scrolls near it (Intersection Observer), serve it in .webm format, and ensure it is placed well below the initial viewport ("below the fold") to protect our SEO scores.

## Data flow for each card

**Keys: need to show taps**

### Card 1 - Ride Booking Flow

- **Image 1:** User opens the home page and sees their home page information including hotspots, promotions, and a "Where to?" search bar.
- **Image 2:** User clicks on the "Where to?" search bar, and then is routed to the Select Location Page where they can search for and select their destination.
- **Image 3:** User selects a destination and is then routed to the Confirm Ride Page where they can see different ride types, prices, and ETAs.

### Card 2 - Payment Flows

- **Image 1:** We have non-cash payment methods set up.
- **Image 2:** When a user selects a non-cash payment method, we can show a direct charge flow where they enter their mobile money number or bank details directly within our app. This avoids redirecting them to external sites and provides a smoother experience.
- **Image 3:** Ridehub Wallet Focused, where credits can be loaded from referrals and manual topups.

## Card 3 - Safety and Ride-Sharing Flows

- **Image 1:** Users can share a ride with trusted contacts from their phone, including splitting ride fares and coordinating pickup locations (to come multi-pickup locations in the recent update)
- **Image 2:** Users can also share their ride details (ETA, driver info) with non-users via SMS or WhatsApp, allowing them to keep friends and family informed without needing to download the app.
- **Image 3:** In-app safety features like a RideHub Pass, SOS Button and real-time ride tracking that can be shared with trusted contacts for added security during rides.