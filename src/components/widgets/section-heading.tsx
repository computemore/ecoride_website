import { cn } from '@/utils/cn';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
  tone?: 'light' | 'brand';
}

export const SectionHeading = ({ eyebrow, title, description, centered = false, tone = 'light' }: SectionHeadingProps) => (
  <div className={cn('max-w-3xl', centered && 'mx-auto text-center')}>
    <p className={cn('text-xs font-semibold uppercase tracking-[0.28em]', tone === 'light' ? 'text-slate-950/95' : 'text-white')}>{eyebrow}</p>
    <h2 className={cn('mt-4 text-2xl font-semibold leading-tight sm:text-4xl lg:text-5xl', tone === 'light' ? 'text-slate-950' : 'text-white')}>{title}</h2>
    <p className={cn('mt-5 text-sm leading-6 md:text-lg md:leading-8', tone === 'light' ? 'text-slate-950/85' : 'text-white/75')}>{description}</p>
  </div>
);