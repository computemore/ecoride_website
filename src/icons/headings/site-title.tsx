import type { ComponentProps } from 'react';
import Image from 'next/image';
import { cn } from '@/utils/cn';

type SiteTitleIconProps = Omit<ComponentProps<typeof Image>, 'src' | 'alt' | 'width' | 'height'>;

export const SiteTitleIcon = ({ className, ...props }: SiteTitleIconProps) => (
    <Image
        src="/ecoride-title-small.svg"
        alt="Ecoride"
        width={185}
        height={50}
        className={cn('h-auto w-[148px] md:w-[185px]', className)}
        {...props}
    />
);

export const SiteTitleIconDark = ({ className, ...props }: SiteTitleIconProps) => (
    <Image
        src="/ecoride-title-small-dark.svg"
        alt="Ecoride"
        width={190}
        height={50}
        className={cn('h-auto w-[152px] md:w-[190px]', className)}
        {...props}
    />
);

export const SiteTitleIconRound = ({ className, ...props }: SiteTitleIconProps) => (
    <Image
        src="/ecoride-1024-title-icon.svg"
        alt="Ecoride"
        width={40}
        height={40}
        className={cn('h-auto w-[44px] md:w-[48px]', className)}
        {...props}
    />
);