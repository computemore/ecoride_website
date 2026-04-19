import type { ComponentProps } from 'react';

import Image from 'next/image';

type SiteTitleIconProps = Omit<ComponentProps<typeof Image>, 'src' | 'alt' | 'width' | 'height'>;

export const SiteTitleIcon = (props: SiteTitleIconProps) => (
    <Image src="/ecoride-title-small.svg" alt="EcoRide" width={185} height={50} {...props} />
);