import { NextResponse, type NextRequest } from 'next/server';

const DRIVER_PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.computemore.ecoridedriver';
const DRIVER_APP_STORE_URL = 'https://apps.apple.com/za/app/ecoride-driver/id6765518718';

export async function GET(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';

  // Detect iOS (iPhone, iPad, iPod)
  const isIOS = /iPad|iPhone|iPod/i.test(userAgent);

  // Detect iPadOS / macOS Safari
  const isMacSafari = /Macintosh/i.test(userAgent) && /Safari/i.test(userAgent) && !/Chrome/i.test(userAgent);

  const redirectUrl = isIOS || isMacSafari ? DRIVER_APP_STORE_URL : DRIVER_PLAY_STORE_URL;

  return NextResponse.redirect(redirectUrl, 302);
}
