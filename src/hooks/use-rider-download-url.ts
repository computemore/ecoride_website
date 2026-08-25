'use client';

import { useEffect, useState } from 'react';

const RIDER_PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.computemore.ecoride';
const RIDER_APP_STORE_URL = 'https://apps.apple.com/us/app/ecoride/id6764668342';

export const useRiderDownloadUrl = () => {
  const [url, setUrl] = useState(RIDER_PLAY_STORE_URL);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const browserWindow = window as Window & { opera?: string; MSStream?: unknown };
    const userAgent = window.navigator.userAgent || window.navigator.vendor || browserWindow.opera || '';
    
    // Check for iOS (iPhone, iPad, iPod)
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !browserWindow.MSStream;
    
    // Check for iPadOS (iPad on iOS 13+)
    const isIPadOS = window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1;

    if (isIOS || isIPadOS) {
      setUrl(RIDER_APP_STORE_URL);
    } else {
      setUrl(RIDER_PLAY_STORE_URL);
    }
  }, []);

  return url;
};
