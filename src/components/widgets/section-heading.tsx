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
    <h2 className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">{title}</h2>
    <p className="mt-5 text-[15px] leading-7 text-white/76 md:text-lg md:leading-8">{description}</p>
  </div>
);