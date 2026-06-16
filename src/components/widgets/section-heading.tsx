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
  <div className={cn(
    'flex flex-col max-w-full',
    centered && 'items-center text-center',
    forceAlignment === 'left' && !centered && 'items-start text-left',
    forceAlignment === 'right' && !centered && 'items-end text-right'
  )}>
    <p className={cn('text-[12px] font-semibold uppercase tracking-[0.28em]', tone === 'light' ? 'text-slate-950/80' : 'text-white')}>{eyebrow}</p>
    <h2 className={cn('mt-2 max-w-2xl text-xl font-medium leading-tight sm:text-xl lg:text-3xl', tone === 'light' ? 'text-slate-950' : 'text-white')}>{title}</h2>
    <p className={cn('max-w-3xl text-[14px] leading-7 md:leading-10 text-slate-950/85', tone === 'light' ? 'text-slate-950/85' : 'text-white/75')}>{description}</p>
  </div>
);