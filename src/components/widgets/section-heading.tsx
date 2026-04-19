import { cn } from '@/utils/cn';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
}

export const SectionHeading = ({ eyebrow, title, description, centered = false }: SectionHeadingProps) => (
  <div className={cn('max-w-3xl', centered && 'mx-auto text-center')}>
    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/68">{eyebrow}</p>
    <h2 className="mt-4 text-4xl font-semibold text-white md:text-5xl">{title}</h2>
    <p className="mt-5 text-base leading-8 text-white/76 md:text-lg">{description}</p>
  </div>
);