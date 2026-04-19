import Link from 'next/link';

import { ArrowRightIcon, CheckCircleIcon } from '@/icons';

interface MarketingCardProps {
  eyebrow: string;
  title: string;
  description: string;
  bullets?: string[];
  href?: string;
  hrefLabel?: string;
}

export const MarketingCard = ({ eyebrow, title, description, bullets, href, hrefLabel }: MarketingCardProps) => (
  <article className="surface-card rounded-card p-5 text-left transition duration-200 hover:-translate-y-1 hover:shadow-float md:p-7">
    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/68">{eyebrow}</p>
    <h3 className="mt-4 text-xl font-semibold text-white md:text-2xl">{title}</h3>
    <p className="mt-4 text-[15px] leading-7 text-white/74 md:text-base">{description}</p>
    {bullets ? (
      <ul className="mt-6 space-y-3">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-3 text-sm leading-6 text-white/74">
            <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-white" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    ) : null}
    {href && hrefLabel
      ? (() => {
          const isExternal = href.startsWith('http') || href.startsWith('mailto:');

          if (isExternal) {
            return (
              <a
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-white/80"
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
            <Link className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-white/80" href={href}>
              {hrefLabel}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          );
        })()
      : null}
  </article>
);