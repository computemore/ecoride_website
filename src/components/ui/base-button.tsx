import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

// the base button component is a versatile button that can be rendered as a link or a button element, with various styling options based on the variant and size props
type ButtonVariant = 'solid-light' | 'ghost-light' | 'ghost-outline' | 'solid-dark' | 'solid-green' | 'ghost-dark' | 'ghost-outline-dark';
type ButtonSize = 'sm' | 'md';

// some props for the button
interface BaseButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

// styling for each variant and size of the button, using Tailwind CSS classes
const variantClasses: Record<ButtonVariant, string> = {
  'solid-light': 'bg-white text-black hover:bg-white/90 focus-visible:outline-white',
  'ghost-light': 'bg-white/12 text-white hover:bg-white/18 focus-visible:outline-white underline decoration-[1.5px] underline-offset-[3px]',
  'ghost-outline': 'border border-white/30 bg-transparent text-white hover:bg-white/10 focus-visible:outline-white',
  'solid-dark': 'bg-slate-900 text-white hover:bg-slate-800 focus-visible:outline-slate-900',
  'solid-green': 'bg-[#2c9c8e] text-white hover:bg-[#2c9c8e]/90 focus-visible:outline-[#2c9c8e]',
  'ghost-dark': 'bg-slate-900/6 text-slate-900 hover:bg-slate-900/10 focus-visible:outline-slate-900 underline decoration-[1.5px] underline-offset-[3px]',
  'ghost-outline-dark': 'border border-slate-900/14 bg-transparent text-slate-900 hover:bg-slate-900/5 focus-visible:outline-slate-900',
};

// small and other screens
const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3.5 py-2 text-[14px] md:px-3.5 md:py-2 md:text-[15px]',
  md: 'px-3.5 py-2 text-[14px] md:px-3.5 md:py-2 md:text-[15px]',
};

// constant props for all button variants
const baseClassName =
  'surface-button inline-flex items-center justify-center gap-2 rounded-[14px] font-semibold tracking-[-0.02em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

export const BaseButton = ({
  children,
  className,
  href,
  variant = 'solid-light',
  size = 'md',
  target,
  rel,
  type = 'button',
  onClick,
}: BaseButtonProps) => {
  const resolvedClassName = cn(baseClassName, variantClasses[variant], sizeClasses[size], className);

  if (href) {
    const isExternal = href.startsWith('http');

    if (isExternal) {
      return (
        <a className={resolvedClassName} href={href} target={target ?? '_blank'} rel={rel ?? 'noreferrer'}>
          {children}
        </a>
      );
    }

    return (
      <Link className={resolvedClassName} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={resolvedClassName} type={type} onClick={onClick}>
      {children}
    </button>
  );
};