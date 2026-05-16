// imports
import type { CSSProperties } from 'react';

// site-wide usable component
export const MapOffice = ({ style }: { style?: CSSProperties }) => {
  // coordinates of the office
  const lat = "-15.7877007";
  const long = "35.0042681";
  const injectApiKey = process.env.NEXT_PUBLIC_MAP_API_KEY; // securely inject the API key from environment variables

  const embeddedMapUrl = `https://www.google.com/maps/embed/v1/place?key=${injectApiKey}&q=${lat},${long}`;

  // the map office component is a simple wrapper around the Google Static Maps API
  return (
    // Inside your component above the footer
    <div className="w-full h-64 md:h-96 relative rounded-[20px] bg-gray-100 overflow-hidden" style={style}>
      <iframe
        src={embeddedMapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy" // <-- CRITICAL for performance
        referrerPolicy="no-referrer-when-downgrade"
        title="Ecoride Office Location"
        className="absolute inset-0"
      ></iframe>
    </div>
  );
};