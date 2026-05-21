// imports
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowRightIcon, CheckCircleIcon } from '@/icons';

// enum for hot switchting the card-bg-color
enum CardBackground {
  blue = '#2196F3',
  green = '#2c9c8e',
  red = '#f0453d',
  normal = 'rgba(255, 255, 255, 0.16)'
}

enum CardBackgroundGradient {
  blue = '#64afec',
  green = '#3cdac7',
  red = '#ed7a74',
  normal = 'rgba(255, 255, 255, 0.28)'
}

// data shape for the marketing card
interface MarketingCardProps {
  eyebrow: string;
  title: string;
  description: string;
  bullets?: string[];
  variation?: keyof typeof CardBackground; // optional variation prop to select background color, defaults to blue
  href?: string;
  hrefLabel?: string;
}

// site-wide usable component
export const MarketingCard = ({ eyebrow, title, description, bullets, variation = 'normal', href, hrefLabel }: MarketingCardProps & { variation?: keyof typeof CardBackground }) => {
  const cardStyle = { '--card-bg-color' : CardBackground[variation], '--card-bg-color-gradient' : CardBackgroundGradient[variation] } as CSSProperties; // default to blue, can be overridden by passing a different background color in the future if needed

  // the surface-card class provides the base card styling, we can add additional classes for variations if needed in the future, 
  // using style allows hot swapping into css using the a named var that is cross-referened here and in css - pretty cool
  return (
    <article className={`surface-card rounded-[var(--radius-card)] p-4 text-left transition duration-200 md:p-6`} style={cardStyle}>
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/68">{eyebrow}</p>
      <h3 className="mt-1 xl:mt-2 text-base font-semibold text-white xl:text-xl">{title}</h3>
      <p className="mt-1 xl:mt-2 text-xs leading-6 text-white/74 xl:text-sm">{description}</p>
      {bullets ? (
        <ul className="mt-1 space-y-1 xl:mt-4 xl:space-y-4">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3 text-xs leading-6 text-white/74 xl:text-sm">
              <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-white" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {href && hrefLabel
        ? (() => {
            const isExternal = href.startsWith('http') || href.startsWith('mailto:');

            // external links should open in a new tab and have noreferrer for security, internal links can use next/link for prefetching and faster navigation
            if (isExternal) {
              return (
                <a
                  className="mt-2 xl:mt-4 inline-flex items-center gap-2 text-xs font-semibold text-white transition hover:text-white/80 xl:text-sm"
                  href={href}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  target={href.startsWith('http') ? '_blank' : undefined}
                >
                  {hrefLabel}
                  <ArrowRightIcon className="h-4 w-4" />
                </a>
              );
            }

            return (
              <Link className="mt-2 xl:mt-4 inline-flex items-center gap-2 text-xs font-semibold text-white transition hover:text-white/80 xl:text-sm" href={href}>
                {hrefLabel}
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            );
          })()
        : null}
    </article>
  )
};