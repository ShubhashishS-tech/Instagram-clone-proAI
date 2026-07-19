// Custom inline SVGs for brand marks that lucide-react no longer ships.

import type { SVGProps } from 'react';

export function InstagramWordmark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg" {...props}>
      <text
        x="100"
        y="44"
        textAnchor="middle"
        fontFamily="'Grand Hotel', cursive"
        fontSize="46"
        fill="currentColor"
      >
        Instagram
      </text>
    </svg>
  );
}

export function CameraGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3l2-3h8l2 3h3a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

export function MetaLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M6.5 4C2.9 4 0 7.6 0 12c0 4.2 2.6 8 6.5 8 2.2 0 3.8-1 5.1-2.6l-1.3-1.8c-1 1.3-2 2-3.7 2-2.2 0-3.9-2-4.1-4.8h9.4v-1C11.9 7.6 9.7 4 6.5 4zm-4 6.6C2.9 8 4.5 6.3 6.5 6.3s3.6 1.7 4 4.3h-8zM33.5 4c-3.6 0-6.5 3.6-6.5 8 0 4.4 2.9 8 6.5 8 3.6 0 6.5-3.6 6.5-8 0-4.4-2.9-8-6.5-8zm0 2.3c2.4 0 4.3 2.4 4.3 5.7s-1.9 5.7-4.3 5.7-4.3-2.4-4.3-5.7 1.9-5.7 4.3-5.7zM20 4c-1.6 0-3 1-4 2.6C15 5 13.6 4 12 4c-.5 0-1 .1-1.5.2l.8 2.2c.2-.1.5-.1.7-.1 1.4 0 2.5 1.4 2.5 3.6v8.6h2V10c0-2.2 1.1-3.6 2.5-3.6s2.5 1.4 2.5 3.6v8.5h2V9.9c0-3.4-1.8-5.9-4.5-5.9z" />
    </svg>
  );
}

export function GoogleG(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.08H1.4v5.7C5.03 41.07 13.96 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.17C11.25 26.85 11 25.45 11 24s.25-2.85.69-4.17v-5.7H1.4C.5 17.1 0 20.49 0 24s.5 6.9 1.4 10.17l10.29-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.94 2 24 2 13.96 2 5.03 6.93 1.4 14.83l10.29 5.7c1.73-5.21 6.58-9.08 12.31-9.08z" />
    </svg>
  );
}
