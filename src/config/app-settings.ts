const riderAppLink = process.env.CLOSED_TESTING_RIDER_APP_LINK || 'https://play.google.com/store/apps/details?id=com.computemore.ecoride';
// const riderAppTesterLink = process.env.CLOSED_TESTING_RIDER_APP_TESTER_LINK || 'https://play.google.com/apps/testing/com.computemore.ecoride';
const driverAppLink = process.env.CLOSED_TESTING_DRIVER_APP_LINK || 'https://play.google.com/store/apps/details?id=com.computemore.ecoridedriver';
// const driverAppTesterLink = process.env.CLOSED_TESTING_DRIVER_APP_TESTER_LINK || 'https://play.google.com/apps/testing/com.computemore.ecoridedriver';
const driverPayoutMethodsVideoUrl = process.env.NEXT_PUBLIC_DRIVER_PAYOUT_METHODS_VIDEO_URL || '';

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
