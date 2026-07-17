import { NextResponse, type NextRequest } from 'next/server';

const RIDER_PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.computemore.ecoride';
const RIDER_APP_STORE_URL = 'https://apps.apple.com/za/app/ecoride/id6764668342';

const DRIVER_PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.computemore.ecoridedriver';
const DRIVER_APP_STORE_URL = 'https://apps.apple.com/za/app/ecoride-driver/id6765518718';
// If there's an iOS Driver App in the future, put the URL here.
// const DRIVER_APP_STORE_URL = DRIVER_PLAY_STORE_URL; 

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const appType = searchParams.get('app') || 'rider'; // Default to rider app

  const userAgent = request.headers.get('user-agent') || '';

  // Detect iOS (iPhone, iPad, iPod)
  const isIOS = /iPad|iPhone|iPod/i.test(userAgent);
  
  // Detect iPadOS in desktop request mode (often reports as Macintosh but has touch support)
  const isMacSafari = /Macintosh/i.test(userAgent) && /Safari/i.test(userAgent) && !/Chrome/i.test(userAgent);

  let redirectUrl = RIDER_PLAY_STORE_URL;

  if (appType === 'driver') {
    redirectUrl = (isIOS || isMacSafari) ? DRIVER_APP_STORE_URL : DRIVER_PLAY_STORE_URL;
  } else {
    // Rider app
    redirectUrl = (isIOS || isMacSafari) ? RIDER_APP_STORE_URL : RIDER_PLAY_STORE_URL;
  }

  return NextResponse.redirect(redirectUrl, 302);
}
