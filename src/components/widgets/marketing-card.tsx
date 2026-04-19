import { CheckCircleIcon } from '@/icons';

interface MarketingCardProps {
  eyebrow: string;
  title: string;
  description: string;
  bullets?: string[];
}

export const MarketingCard = ({ eyebrow, title, description, bullets }: MarketingCardProps) => (
  <article className="surface-card rounded-card p-6 text-left transition duration-200 hover:-translate-y-1 hover:shadow-float md:p-7">
    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/68">{eyebrow}</p>
    <h3 className="mt-4 text-2xl font-semibold text-white">{title}</h3>
    <p className="mt-4 text-base leading-7 text-white/74">{description}</p>
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
  </article>
);