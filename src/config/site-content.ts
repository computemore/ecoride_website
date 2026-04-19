import type { PageTheme, PublicPageKey, SeoProps, NavItem } from '@/types';

export interface CardContent {
  eyebrow: string;
  title: string;
  description: string;
  bullets?: string[];
}

export interface AboutSection {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  cards: CardContent[];
}

const aboutDropdownItems = [
  { href: '/about#about-us', label: 'About Us' },
  { href: '/about#partners', label: 'Partners' },
  { href: '/about#how-ecoride-works', label: 'How Ecoride Works' },
  { href: '/about#explore', label: 'Explore' },
  { href: '/about#blog', label: 'Blog' },
  { href: '/about#corporate-overview', label: 'Corporate' },
] as const;

export const pageThemes: Record<PublicPageKey, PageTheme> = {
  home: { pageColor: '#f0453d' },
  ride: { pageColor: '#2c9c8e' },
  drive: { pageColor: '#f0453d' },
  corporate: { pageColor: '#2196F3' },
  about: { pageColor: '#f0453d' },
};

export const pageSeo: Record<PublicPageKey, SeoProps> = {
  home: {
    title: 'Ecoride Malawi | A Ride Simplified',
    description:
      'Welcome to Ecoride, a local-first ride sharing platform by Malawians, for Malawians. Discover rider, driver, and corporate transport options built for Malawi.',
    canonical: '/',
    ogImage: '/ecoride-256.png',
    keywords: ['Ecoride Malawi', 'ride sharing Malawi', 'local taxi app Malawi'],
  },
  ride: {
    title: 'Ride With Ecoride | Safer Local Trips',
    description:
      'Book safer, local-first rides with trusted trip sharing, verification, flexible payments, and rider-friendly convenience across Malawi.',
    canonical: '/ride',
    ogImage: '/ecoride-256.png',
    keywords: ['book rides Malawi', 'Ecoride rider app', 'safe taxi Malawi'],
  },
  drive: {
    title: 'Drive With Ecoride | Earn On Your Schedule',
    description:
      'Drive with Ecoride and earn on your schedule with clear onboarding, flexible vehicle classes, real-time requests, and dedicated support.',
    canonical: '/drive',
    ogImage: '/ecoride-256.png',
    keywords: ['drive with Ecoride', 'driver app Malawi', 'earn by driving Malawi'],
  },
  corporate: {
    title: 'Ecoride Corporate | Reliable Transport For Teams',
    description:
      'Explore corporate mobility with dependable local support, business-ready travel coordination, and partnership-friendly transport planning.',
    canonical: '/corporate',
    ogImage: '/ecoride-256.png',
    keywords: ['corporate transport Malawi', 'business rides Malawi', 'Ecoride corporate'],
  },
  about: {
    title: 'About Ecoride | Local-First Mobility In Malawi',
    description:
      'Learn how Ecoride works, meet the local-first mission behind the platform, and explore partnerships, rider services, and corporate mobility.',
    canonical: '/about',
    ogImage: '/ecoride-256.png',
    keywords: ['about Ecoride', 'Malawi mobility platform', 'Ecoride partners'],
  },
};

export const headerNavigation: Record<PublicPageKey, NavItem[]> = {
  home: [
    { kind: 'link', label: 'Ride', href: '/ride' },
    { kind: 'link', label: 'Drive', href: '/drive' },
    { kind: 'link', label: 'Ecoride Corporate', href: '/corporate' },
    { kind: 'dropdown', label: 'About', items: [...aboutDropdownItems] },
  ],
  ride: [
    { kind: 'link', label: 'Ride', href: '/ride' },
    { kind: 'link', label: 'Rent', href: '/about#explore' },
  ],
  drive: [
    { kind: 'link', label: 'Drive', href: '/drive' },
    { kind: 'link', label: 'Rent out', href: '/about#partners' },
  ],
  corporate: [
    { kind: 'link', label: 'Ecoride Corporate', href: '/corporate' },
    { kind: 'link', label: 'Partnerships', href: '/about#partners' },
  ],
  about: [
    { kind: 'link', label: 'About', href: '/about' },
    { kind: 'dropdown', label: 'Explore', items: [...aboutDropdownItems] },
  ],
};

export const homeAboutCards: CardContent[] = [
  {
    eyebrow: 'Safe',
    title: 'Built around trust from the first pickup',
    description:
      'Every rider touchpoint is designed to make local transport feel predictable, verified, and easy to trust.',
    bullets: ['Vehicle and driver checks', 'Trip verification cues', 'Support-friendly reporting'],
  },
  {
    eyebrow: 'Reliable',
    title: 'Local transport that respects people’s time',
    description:
      'Ecoride is shaped around dependable pickups, rider visibility, and practical local support instead of generic marketplace noise.',
    bullets: ['Clear ride status', 'Transparent coordination', 'Local-first service standards'],
  },
  {
    eyebrow: 'Always On',
    title: 'Support that stays close to the journey',
    description:
      'From rider help to driver escalation, the platform is framed around practical support before, during, and after the trip.',
    bullets: ['Responsive assistance', 'Trip-share confidence', 'Local credibility and access'],
  },
];

export const rideFeatureCards: CardContent[] = [
  {
    eyebrow: 'RideHubPass',
    title: 'A safer ride starts with verification',
    description:
      'The rider app emphasizes protected trips with verification moments that make each pickup feel intentional and secure.',
    bullets: ['Trip verification flow', 'Driver detail visibility', 'Trusted ride confirmation'],
  },
  {
    eyebrow: 'Trip Sharing',
    title: 'Keep the right people close to every journey',
    description:
      'Trusted contacts, real-time sharing, and rider-friendly visibility features make it easier to travel with confidence.',
    bullets: ['Share live trip progress', 'Trusted contacts support', 'Safety-focused rider experience'],
  },
  {
    eyebrow: 'Flexible',
    title: 'Local convenience without extra friction',
    description:
      'Multi-stop trips, guest rides, and local payment flexibility make Ecoride practical for real day-to-day transport in Malawi.',
    bullets: ['Cash and mobile money', 'Multi-stop ride support', 'Order for someone else'],
  },
];

export const driveFeatureCards: CardContent[] = [
  {
    eyebrow: 'Earn',
    title: 'Drive when it works for you',
    description:
      'The driver product is built around flexible schedules, online-offline control, and clear activity visibility for everyday earning.',
    bullets: ['Flexible availability', 'Daily activity visibility', 'Earnings-led workflow'],
  },
  {
    eyebrow: 'Move Fast',
    title: 'Receive requests in real time',
    description:
      'Drivers are positioned to respond quickly with instant ride notifications, in-app chat, and operational clarity across each trip.',
    bullets: ['Real-time trip requests', 'In-ride rider communication', 'Fast and luxury ride classes'],
  },
  {
    eyebrow: 'Support',
    title: 'Onboarding and safety remain visible',
    description:
      'From documents to support access, the product keeps driver readiness and escalation paths close to daily work.',
    bullets: ['Document-based onboarding', 'Driver Safety Hub', 'Support visibility'],
  },
];

export const corporateFeatureCards: CardContent[] = [
  {
    eyebrow: 'Business Ready',
    title: 'Local transport that feels prepared for teams',
    description:
      'Ecoride Corporate is positioned for organizations that need transport coordination with a local operator mindset.',
    bullets: ['Consistent ride planning', 'Business travel context', 'Local relationship management'],
  },
  {
    eyebrow: 'Dependable',
    title: 'A partner model, not just an app download',
    description:
      'Corporate mobility should feel accountable, reachable, and easy to align with daily operations.',
    bullets: ['Support-led communication', 'Local-first escalation', 'Reliable rider experience'],
  },
  {
    eyebrow: 'Scalable',
    title: 'A cleaner platform for future partnerships',
    description:
      'The website leaves room for future enterprise workflows while delivering a strong public-facing story today.',
    bullets: ['Partnership-ready messaging', 'Future workflow extension points', 'Clear public acquisition route'],
  },
];

export const aboutSections: AboutSection[] = [
  {
    id: 'about-us',
    eyebrow: 'About Us',
    title: 'A local-first platform built around real transport habits',
    description:
      'Ecoride is being rebuilt as a clearer public front door for rider, driver, and business transport in Malawi.',
    cards: homeAboutCards,
  },
  {
    id: 'partners',
    eyebrow: 'Partners',
    title: 'Partnerships work better when the local context is respected',
    description:
      'The platform is designed to support operators, organizations, and drivers who need mobility that feels locally grounded.',
    cards: corporateFeatureCards,
  },
  {
    id: 'how-ecoride-works',
    eyebrow: 'How Ecoride Works',
    title: 'One platform, shaped for riders, drivers, and teams',
    description:
      'Ecoride connects local transport use cases without forcing one generic experience onto every user group.',
    cards: [rideFeatureCards[0], driveFeatureCards[0], corporateFeatureCards[0]],
  },
  {
    id: 'explore',
    eyebrow: 'Explore',
    title: 'Different journeys need different entry points',
    description:
      'Ride pages speak to safety and flexibility, Drive pages speak to earning and support, and Corporate pages speak to coordination and reliability.',
    cards: [rideFeatureCards[2], driveFeatureCards[1], corporateFeatureCards[1]],
  },
  {
    id: 'blog',
    eyebrow: 'Blog',
    title: 'A content space that can grow with the platform',
    description:
      'Phase 1 keeps the structure ready for local mobility stories, product updates, and rider or driver education without launching a thin placeholder blog.',
    cards: [
      {
        eyebrow: 'Soon',
        title: 'Product updates and rollout stories',
        description: 'A future content stream can support SEO and public trust without cluttering the launch build.',
      },
      {
        eyebrow: 'Soon',
        title: 'Driver guidance and rider education',
        description: 'This route cluster can later carry practical tips, safety explainers, and corporate mobility updates.',
      },
      {
        eyebrow: 'Soon',
        title: 'Local mobility coverage',
        description: 'The structure is ready for a content rhythm once editorial priorities are defined.',
      },
    ],
  },
  {
    id: 'corporate-overview',
    eyebrow: 'Corporate Overview',
    title: 'The public site leaves room for a deeper enterprise layer later',
    description:
      'The current phase stays acquisition-focused while keeping a path open for richer corporate workflows in future releases.',
    cards: corporateFeatureCards,
  },
];