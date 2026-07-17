import { useDriverDownloadUrl } from '@/hooks/use-driver-download-url';
import { useRiderDownloadUrl } from '@/hooks/use-rider-download-url';

const riderAppLink = useRiderDownloadUrl;
// const riderAppTesterLink = process.env.CLOSED_TESTING_RIDER_APP_TESTER_LINK || 'https://play.google.com/apps/testing/com.computemore.ecoride';
const driverAppLink = useDriverDownloadUrl;
// const driverAppTesterLink = process.env.CLOSED_TESTING_DRIVER_APP_TESTER_LINK || 'https://play.google.com/apps/testing/com.computemore.ecoridedriver';
const driverPayoutMethodsVideoUrl = process.env.NEXT_PUBLIC_DRIVER_PAYOUT_METHODS_VIDEO_URL || 'https://media.ecoridemw.com/videos/iphone-17-pro_payout-method-add-720p.mp4';

// export this content for site wide use, such as in the header, footer, or contact page
export const appSettings = {
  siteName: 'Ecoride',
  siteUrl: 'https://ecoridemw.com',
  supportEmail: 'support@ecoridemw.com',
  addressLines: ['Blantyre City, Victoria Avenue', 'Meridian House, First Floor'],
  phoneNumbers: ['+265 893 236 026', '+265 995 006 101'],
  socialLinks: [
    { label: 'Facebook', href: 'https://www.facebook.com/ecoride' },
    { label: 'Instagram', href: 'https://www.instagram.com/ecoride_mw' },
    { label: 'X', href: 'https://www.twitter.com/ecoride1' },
  ],
  downloadLinks: {
    rider: {
      label: 'Rider',
      href: riderAppLink,
    },
    driver: {
      label: 'Driver',
      href: driverAppLink,
    },
  },
  media: {
    driverPayoutMethodsVideoUrl,
  },
} as const;
