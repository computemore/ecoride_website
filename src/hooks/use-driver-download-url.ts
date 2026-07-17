'use client';

import { useEffect, useState } from 'react';

const DRIVER_PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.computemore.ecoridedriver';
const DRIVER_APP_STORE_URL = 'https://apps.apple.com/za/app/ecoride-driver/id6765518718';

export const useDriverDownloadUrl = () => {
  const [url, setUrl] = useState(DRIVER_PLAY_STORE_URL);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const userAgent = window.navigator.userAgent || window.navigator.vendor || (window as any).opera;
    
    // Check for iOS (iPhone, iPad, iPod)
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
    
    // Check for iPadOS (iPad on iOS 13+)
    const isIPadOS = window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1;

    if (isIOS || isIPadOS) {
      setUrl(DRIVER_APP_STORE_URL);
    } else {
      setUrl(DRIVER_PLAY_STORE_URL);
    }
  }, []);

  return url;
};
