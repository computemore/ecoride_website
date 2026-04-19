import Link from 'next/link';
import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

type ButtonVariant = 'solid-light' | 'ghost-light' | 'ghost-outline';
type ButtonSize = 'sm' | 'md';

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

const variantClasses: Record<ButtonVariant, string> = {
  'solid-light': 'bg-white text-black hover:bg-white/90',
  'ghost-light': 'bg-white/12 text-white hover:bg-white/18',
  'ghost-outline': 'border border-white/30 bg-transparent text-white hover:bg-white/10',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2.5 text-sm',
  md: 'px-5 py-3 text-sm md:text-[15px]',
};

const baseClassName =
  'surface-button inline-flex items-center justify-center gap-2 rounded-pill font-medium tracking-[-0.02em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

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