import type { ComponentProps } from 'react';

import Image from 'next/image';

import { cn } from '@/utils/cn';

type SiteTitleIconProps = Omit<ComponentProps<typeof Image>, 'src' | 'alt' | 'width' | 'height'>;

export const SiteTitleIcon = ({ className, ...props }: SiteTitleIconProps) => (
    <Image
        src="/ecoride-title-small.svg"
        alt="EcoRide"
        width={185}
        height={50}
        className={cn('h-auto w-[148px] md:w-[185px]', className)}
        {...props}
    />
);