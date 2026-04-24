import { cn } from '@/utils/cn';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
  forceAlignment?: 'left' | 'right';
  tone?: 'light' | 'brand';
}

export const SectionHeading = ({ eyebrow, title, description, centered = false, forceAlignment = 'left', tone = 'light' }: SectionHeadingProps) => (
  <div className={cn('max-w-full', centered && 'mx-auto text-center', forceAlignment === 'left' && 'text-left', forceAlignment === 'right' && 'text-right')}>
    <p className={cn('text-[14px] font-semibold uppercase tracking-[0.28em]', tone === 'light' ? 'text-slate-950/85' : 'text-white')}>{eyebrow}</p>
    <h2 className={cn('mt-4 text-2xl font-medium leading-tight sm:text-4xl lg:text-5xl', tone === 'light' ? 'text-slate-950' : 'text-white')}>{title}</h2>
    <p className={cn('mt-5 text-[16px] font-medium leading-6 md:text-[18px] md:leading-8', tone === 'light' ? 'text-slate-950/85' : 'text-white/75')}>{description}</p>
  </div>
);