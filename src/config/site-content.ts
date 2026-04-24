import type { NavItem, PageTheme, PublicPageKey, SeoProps } from '@/types';

export interface CardContent {
  eyebrow: string;
  title: string;
  description: string;
  bullets?: string[];
  href?: string;
  hrefLabel?: string;
}

export interface HighlightStat {
  value: string;
  label: string;
  description: string;
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
  { href: '/about/terms', label: 'Terms' },
  { href: '/about/privacy-policy', label: 'Privacy Policy' },
] as const;

// this file centralizes all the static content for the site, such as page themes, SEO metadata, navigation items, and marketing copy for each section
export const pageThemes: Record<PublicPageKey, PageTheme> = {
  home: { pageColor: '#ffffff' },
  ride: { pageColor: '#2c9c8e' },
  drive: { pageColor: '#f0453d' },
  corporate: { pageColor: '#2196F3' },
  about: { pageColor: '#f0453d' },
};

export const pageSeo: Record<PublicPageKey, SeoProps> = {
  home: {
    title: 'Ecoride Malawi | A Ride Simplified',
    description:
      'Welcome to Ecoride, a local-first ride sharing platform by Malawians, for Malawians. Discover safer rider journeys, driver opportunities, and corporate transport built for Malawi.',
    canonical: '/',
    ogImage: '/ecoride-256.png',
    keywords: ['Ecoride Malawi', 'ride sharing Malawi', 'local taxi app Malawi'],
  },
  ride: {
    title: 'Ride With Ecoride | Safer Local Trips',
    description:
      'Book safer, local-first rides with trusted trip sharing, verification, flexible payments, and rider-friendly convenience built for daily life across Malawi.',
    canonical: '/ride',
    ogImage: '/ecoride-256.png',
    keywords: ['book rides Malawi', 'Ecoride rider app', 'safe taxi Malawi'],
  },
  drive: {
    title: 'Drive With Ecoride | Earn On Your Schedule',
    description:
      'Drive with Ecoride and earn on your schedule with clear onboarding, flexible vehicle classes, real-time requests, and visible support.',
    canonical: '/drive',
    ogImage: '/ecoride-256.png',
    keywords: ['drive with Ecoride', 'driver app Malawi', 'earn by driving Malawi'],
  },
  corporate: {
    title: 'Ecoride Corporate | Reliable Transport For Teams',
    description:
      'Explore corporate mobility with fixed per-km pricing, local support, dashboard visibility, and a more sustainable alternative to managing fleets.',
    canonical: '/corporate',
    ogImage: '/ecoride-256.png',
    keywords: ['corporate transport Malawi', 'business rides Malawi', 'Ecoride corporate'],
  },
  about: {
    title: 'About Ecoride | Local-First Mobility In Malawi',
    description:
      'Learn how Ecoride works, meet the local-first mission behind the platform, and explore rider services, driver opportunities, and corporate mobility.',
    canonical: '/about',
    ogImage: '/ecoride-256.png',
    keywords: ['about Ecoride', 'Malawi mobility platform', 'Ecoride partners'],
  },
};

export const legalPageSeo = {
  privacyPolicy: {
    title: 'Privacy Policy | Ecoride Malawi',
    description:
      'Read how Ecoride collects, processes, stores, and protects personal data across rider, driver, website, and service interactions in Malawi.',
    canonical: '/about/privacy-policy',
    ogImage: '/ecoride-256.png',
    keywords: ['Ecoride privacy policy', 'Malawi data protection', 'Ecoride personal data'],
  },
  terms: {
    title: 'Terms Of Use | Ecoride Malawi',
    description:
      'Review the legal terms that govern access to Ecoride services, payments, liability, dispute resolution, and user responsibilities in Malawi.',
    canonical: '/about/terms',
    ogImage: '/ecoride-256.png',
    keywords: ['Ecoride terms of use', 'Ecoride legal terms', 'Malawi ride sharing terms'],
  },
} satisfies Record<'privacyPolicy' | 'terms', SeoProps>;

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
      'Every rider touchpoint is designed to make local transport feel predictable, verified, and easier to trust from the first request.',
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

export const homeSignalStats: HighlightStat[] = [
  {
    value: '24/7',
    label: 'Local support posture',
    description: 'Support should feel reachable before, during, and after the trip.',
  },
  {
    value: '3',
    label: 'Clear entry points',
    description: 'Rider, Driver, and Corporate journeys each get their own focused story.',
  },
  {
    value: 'MW',
    label: 'Local-first design',
    description: 'The platform is framed around how transport works in Malawi, not generic template copy.',
  },
];

// home journey cars are now being renamed to home info cards
export const homeInfoCards: CardContent[] = [
  {
    eyebrow: 'Ride',
    title: 'Book safer trips with more context at every stage',
    description: 'Verification, trip sharing, and flexible payments make rider journeys feel easier to trust and simpler to manage.',
    bullets: ['Trusted ride confirmation', 'Trip sharing and contacts', 'Flexible local payment options'],
    variation: 'green',
    href: '/ride',
    hrefLabel: 'Explore Ride',
  },
  {
    eyebrow: 'Drive',
    title: 'Earn with flexible availability and visible support',
    description: 'The driver experience is framed around real-time demand, clearer onboarding, and support that stays in view.',
    bullets: ['Flexible earning flow', 'Fast and luxury ride classes', 'Driver Safety Hub support'],
    variation: 'green',
    href: '/drive',
    hrefLabel: 'Explore Drive',
  },
  {
    eyebrow: 'Corporate',
    title: 'Coordinate team transport without carrying fleet overhead',
    description: 'Fixed per-km pricing and a dedicated support model give businesses a cleaner, more sustainable transport option.',
    bullets: ['Fixed per-km pricing', 'Dashboard and analytics visibility', 'Dedicated corporate support'],
    variation: 'green',
    href: '/corporate',
    hrefLabel: 'Explore Corporate',
  },
];

export const rideFeatureCards: CardContent[] = [
  {
    eyebrow: 'RideHubPass',
    title: 'A safer ride starts with verification',
    description:
      'The rider app emphasizes protected trips with verification moments that make each pickup feel intentional and secure.',
    bullets: ['Trip verification flow', 'Driver detail visibility', 'Trusted ride confirmation'],
    href: '/about#how-ecoride-works',
    hrefLabel: 'See how it works',
  },
  {
    eyebrow: 'Trip Sharing',
    title: 'Keep the right people close to every journey',
    description:
      'Trusted contacts, real-time sharing, and rider-friendly visibility features make it easier to travel with confidence.',
    bullets: ['Share live trip progress', 'Trusted contacts support', 'Safety-focused rider experience'],
    href: '/about#about-us',
    hrefLabel: 'Why it matters',
  },
  {
    eyebrow: 'Flexible',
    title: 'Local convenience without extra friction',
    description:
      'Multi-stop trips, guest rides, and local payment flexibility make Ecoride practical for real day-to-day transport in Malawi.',
    bullets: ['Cash and mobile money', 'Multi-stop ride support', 'Order for someone else'],
    href: '/about#explore',
    hrefLabel: 'Explore rider journeys',
  },
];

export const rideConfidenceCards: CardContent[] = [
  {
    eyebrow: 'Before pickup',
    title: 'Know more before the trip begins',
    description: 'Riders should see enough context to feel confident before they step into the car.',
    bullets: ['Driver and vehicle visibility', 'Verification cues', 'Clear pickup context'],
  },
  {
    eyebrow: 'During trip',
    title: 'Stay connected without adding friction',
    description: 'Trip sharing and trusted contacts make visibility part of the journey instead of an afterthought.',
    bullets: ['Share live trip progress', 'Keep trusted contacts informed', 'Coordinate when plans shift'],
  },
  {
    eyebrow: 'After arrival',
    title: 'Support remains close to the experience',
    description: 'Ecoride is positioned around practical follow-through, not just the booking moment.',
    bullets: ['Support-friendly reporting', 'Local escalation posture', 'Confidence for repeat use'],
  },
];

export const driveFeatureCards: CardContent[] = [
  {
    eyebrow: 'Earn',
    title: 'Drive when it works for you',
    description:
      'The driver product is built around flexible schedules, online-offline control, and clear activity visibility for everyday earning.',
    bullets: ['Flexible availability', 'Daily activity visibility', 'Earnings-led workflow'],
    href: '/about#partners',
    hrefLabel: 'Explore driver opportunities',
  },
  {
    eyebrow: 'Move Fast',
    title: 'Receive requests in real time',
    description:
      'Drivers are positioned to respond quickly with instant ride notifications, in-app chat, and operational clarity across each trip.',
    bullets: ['Real-time trip requests', 'In-ride rider communication', 'Fast and luxury ride classes'],
    href: '/about#how-ecoride-works',
    hrefLabel: 'See the workflow',
  },
  {
    eyebrow: 'Support',
    title: 'Onboarding and safety remain visible',
    description:
      'From documents to support access, the product keeps driver readiness and escalation paths close to daily work.',
    bullets: ['Document-based onboarding', 'Driver Safety Hub', 'Support visibility'],
    href: '/about#about-us',
    hrefLabel: 'See the platform story',
  },
];

export const driveSupportCards: CardContent[] = [
  {
    eyebrow: 'Onboarding',
    title: 'Join with clearer readiness expectations',
    description: 'The website should make it obvious that onboarding is structured, visible, and built for long-term driver quality.',
    bullets: ['Document-based review', 'Vehicle-class readiness', 'Simple next-step clarity'],
  },
  {
    eyebrow: 'Earnings',
    title: 'Keep the earning story practical',
    description: 'The message stays focused on flexible availability and live trip flow instead of abstract recruitment language.',
    bullets: ['Flexible online hours', 'Real-time demand visibility', 'Clear activity flow'],
  },
  {
    eyebrow: 'Safety',
    title: 'Support remains part of the driver day',
    description: 'Safety and escalation should stay visible enough to build confidence for daily work.',
    bullets: ['Driver Safety Hub support', 'Support contact visibility', 'Better trust for repeat driving'],
  },
];

export const corporateFeatureCards: CardContent[] = [
  {
    eyebrow: 'Fixed rate',
    title: 'Pay per kilometer instead of carrying fleet overhead',
    description:
      'Corporate transport works better when teams can predict spend, avoid vehicle depreciation, and stop absorbing the overhead of fleet management.',
    bullets: ['Fixed per-km pricing', 'Lower fleet-management overhead', 'Cleaner cost planning'],
    href: '/about#corporate-overview',
    hrefLabel: 'Read the overview',
  },
  {
    eyebrow: 'Visibility',
    title: 'Manage rides with clearer dashboards and analytics',
    description:
      'Corporate clients need more than bookings. They need ride visibility, analytics, and a better view of how transport decisions affect performance.',
    bullets: ['Ride management dashboard', 'Analytics visibility', 'Transport optimization support'],
    href: '/about#how-ecoride-works',
    hrefLabel: 'See the platform model',
  },
  {
    eyebrow: 'Support',
    title: 'Dedicated help keeps the partnership accountable',
    description:
      'A dedicated corporate support team helps the service feel like a working partnership instead of another unmanaged vendor relationship.',
    bullets: ['Dedicated corporate support team', 'Local-first escalation path', 'Dependable service continuity'],
    href: 'mailto:support@ecoridemw.com',
    hrefLabel: 'Contact support',
  },
];

export const corporateOutcomeCards: CardContent[] = [
  {
    eyebrow: 'Savings',
    title: 'Reduce transport costs without buying depreciating vehicles',
    description: 'Ecoride gives businesses a more flexible way to manage movement without locking capital into vehicle ownership.',
    bullets: ['Avoid depreciation exposure', 'Reduce maintenance burden', 'Simplify transport budgeting'],
  },
  {
    eyebrow: 'Control',
    title: 'Keep rides, teams, and patterns visible',
    description: 'The corporate product story stays anchored on ride oversight, usage visibility, and better transport decision-making.',
    bullets: ['View ride activity', 'Track usage patterns', 'Support transport planning'],
  },
  {
    eyebrow: 'Sustainability',
    title: 'Offer employees a cleaner mobility option',
    description: 'By partnering with Ecoride, businesses can reduce their carbon footprint while giving teams a more sustainable travel alternative.',
    bullets: ['Reduce fleet pressure', 'Support cleaner mobility choices', 'Strengthen sustainability commitments'],
  },
];

export const aboutOverviewCards: CardContent[] = [
  {
    eyebrow: 'Local-first',
    title: 'Built for the transport habits people already have',
    description: 'The platform is designed around practical rider, driver, and business realities in Malawi instead of imported marketplace assumptions.',
    href: '/ride',
    hrefLabel: 'Start with Ride',
  },
  {
    eyebrow: 'Structured',
    title: 'One platform with clearer entry points',
    description: 'Rider, Driver, and Corporate stories stay focused so each audience sees the parts that matter most to them.',
    href: '/drive',
    hrefLabel: 'See Drive',
  },
  {
    eyebrow: 'Scalable',
    title: 'Ready to grow without losing clarity',
    description: 'The public site is lean today, but the structure already supports deeper corporate, content, and product layers later.',
    href: '/corporate',
    hrefLabel: 'See Corporate',
  },
];

export const aboutSections: AboutSection[] = [
  {
    id: 'about-us',
    eyebrow: 'About Us',
    title: 'A local-first platform built around real transport habits',
    description:
      'Ecoride is designed to make local transport feel clearer, safer, and more accountable for riders, drivers, and businesses across Malawi.',
    cards: [
      {
        eyebrow: 'Mission',
        title: 'Keep transport practical, local, and trustworthy',
        description: 'The platform is framed around journeys people already take and the support they expect around them.',
      },
      {
        eyebrow: 'Approach',
        title: 'Build confidence before scale',
        description: 'Verification, support visibility, and clearer entry points matter more than flashy transport language.',
      },
      {
        eyebrow: 'Platform',
        title: 'One public front door for three different journeys',
        description: 'The public site separates rider, driver, and corporate stories so each audience gets a clearer path.',
      },
    ],
  },
  {
    id: 'partners',
    eyebrow: 'Partners',
    title: 'Partnerships work better when the local context is respected',
    description:
      'The platform is structured for organizations, support teams, and operating partners who need transport that feels locally grounded and easier to manage.',
    cards: [
      {
        eyebrow: 'Corporate',
        title: 'Support team movement without growing a fleet',
        description: 'Fixed per-km pricing and transport visibility help organizations manage mobility more efficiently.',
        href: '/corporate',
        hrefLabel: 'See corporate transport',
      },
      {
        eyebrow: 'Driver',
        title: 'Work with drivers through clearer readiness standards',
        description: 'A stronger driver story supports quality, consistency, and better support expectations.',
        href: '/drive',
        hrefLabel: 'See driver opportunities',
      },
      {
        eyebrow: 'Local',
        title: 'Keep relationships close to the operating context',
        description: 'Ecoride is positioned to feel reachable and accountable, not distant and generic.',
      },
    ],
  },
  {
    id: 'how-ecoride-works',
    eyebrow: 'How Ecoride Works',
    title: 'One platform, shaped for riders, drivers, and teams',
    description:
      'Ecoride connects local transport use cases without forcing one generic experience onto every user group.',
    cards: [
      {
        eyebrow: 'Riders',
        title: 'Request, verify, share, and move with more confidence',
        description: 'The rider journey focuses on confidence, visibility, and convenience at everyday moments.',
        href: '/ride',
        hrefLabel: 'Open Ride',
      },
      {
        eyebrow: 'Drivers',
        title: 'Go online, receive requests, and keep support close',
        description: 'The driver journey is built around flexible earning and visible operational support.',
        href: '/drive',
        hrefLabel: 'Open Drive',
      },
      {
        eyebrow: 'Teams',
        title: 'Coordinate employee movement with cleaner oversight',
        description: 'The corporate journey is framed around planning, cost visibility, and dedicated support.',
        href: '/corporate',
        hrefLabel: 'Open Corporate',
      },
    ],
  },
  {
    id: 'explore',
    eyebrow: 'Explore',
    title: 'Different journeys need different entry points',
    description:
      'Ride pages speak to safety and flexibility, Drive pages speak to earning and support, and Corporate pages speak to coordination and reliability.',
    cards: [homeInfoCards[0], homeInfoCards[1], homeInfoCards[2]],
  },
  {
    id: 'blog',
    eyebrow: 'Blog',
    title: 'A content space that can grow with the platform',
    description:
      'Phase 2 keeps the structure ready for local mobility stories, product updates, and rider or driver education without launching a thin placeholder blog.',
    cards: [
      {
        eyebrow: 'Soon',
        title: 'Product updates and rollout stories',
        description: 'A future content stream can support SEO and public trust without cluttering the marketing experience.',
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
      'The current phase stays acquisition-focused while keeping a path open for richer corporate workflows, reporting, and account management later.',
    cards: corporateOutcomeCards,
  },
];