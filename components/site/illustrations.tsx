// Original line illustrations drawn for this site (no stock or licensed imagery).
type ArtProps = { label: string; className?: string }

const frame = {
  viewBox: "0 0 480 360",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
}

export function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 0c.7 7.2 4.8 11.3 12 12-7.2.7-11.3 4.8-12 12-.7-7.2-4.8-11.3-12-12C7.2 11.3 11.3 7.2 12 0z" />
    </svg>
  )
}

/** Brand mark: a large four-point sparkle with a small companion, in the gold gradient. */
export function SparkMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="spark-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6e6b0" />
          <stop offset="0.45" stopColor="#d4af37" />
          <stop offset="1" stopColor="#a47c22" />
        </linearGradient>
      </defs>
      <path
        fill="url(#spark-gold)"
        d="M16 4c.9 10.800 6.200 16.100 17 17-10.800.9-16.100 6.200-17 17-.9-10.800-6.200-16.100-17-17C9.800 20.100 15.100 14.800 16 4z"
        transform="translate(1 -1)"
      />
      <path
        fill="url(#spark-gold)"
        d="M33 1c.3 3.600 2.400 5.700 6 6-3.600.3-5.700 2.400-6 6-.3-3.600-2.400-5.700-6-6 3.600-.3 5.700-2.400 6-6z"
      />
    </svg>
  )
}

/**
 * ALL STAR wordmark: thin, wide, squared-round capitals with an open "A",
 * drawn as strokes so it stays crisp at any size. "ALL" takes the text colour,
 * "STAR" the gold gradient.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="-2 -2 286 24"
      className={className}
      aria-hidden="true"
      fill="none"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <linearGradient id="wordmark-gold" gradientUnits="userSpaceOnUse" x1="136" y1="0" x2="282" y2="20">
          <stop offset="0" stopColor="#f6e6b0" />
          <stop offset="0.5" stopColor="#d4af37" />
          <stop offset="1" stopColor="#b08a2c" />
        </linearGradient>
      </defs>
      <g stroke="currentColor">
        <path d="M0 20 13 0l13 20" />
        <path d="M40 0v20h24" />
        <path d="M80 0v20h24" />
      </g>
      <g stroke="url(#wordmark-gold)">
        <path d="M160 0h-19a5 5 0 0 0-5 5 5 5 0 0 0 5 5h14a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-19" />
        <path d="M176 0h26M189 0v20" />
        <path d="M216 20 229 0l13 20" />
        <path d="M256 20V0h19a5 5 0 0 1 5 5v1a5 5 0 0 1-5 5h-19M270 11l10 9" />
      </g>
    </svg>
  )
}

export function EventsArt({ label, className }: ArtProps) {
  return (
    <svg {...frame} role="img" aria-label={label} className={className}>
      <g className="text-gold" stroke="currentColor">
        <path d="M60 40h360" />
        <path d="M120 40v22M240 40v22M360 40v22" />
        <rect x="104" y="62" width="32" height="22" rx="4" />
        <rect x="224" y="62" width="32" height="22" rx="4" />
        <rect x="344" y="62" width="32" height="22" rx="4" />
        <g opacity=".45" strokeWidth="1.5">
          <path d="M110 84L60 268M130 84l70 184" style={{ transformOrigin: "120px 84px", animation: "sweep 7s ease-in-out infinite" }} />
          <path d="M230 84l-50 184M250 84l50 184" />
          <path d="M350 84l-70 184M370 84l50 184" style={{ transformOrigin: "360px 84px", animation: "sweep 9s ease-in-out infinite reverse" }} />
        </g>
        <path d="M240 118l7 18 19 1-15 12 5 19-16-11-16 11 5-19-15-12 19-1z" fill="currentColor" stroke="none" style={{ animation: "twinkle 3s ease-in-out infinite" }} />
      </g>
      <path d="M40 268h400l-24 44H64z" />
      <path d="M40 268v-14h400v14" />
      <path d="M210 254v-52h60v52M222 202v-12h36v12" />
      <circle cx="150" cy="226" r="9" />
      <path d="M136 254c0-12 6-18 14-18s14 6 14 18" />
      <circle cx="330" cy="226" r="9" />
      <path d="M316 254c0-12 6-18 14-18s14 6 14 18" />
    </svg>
  )
}

export function ExhibitionsArt({ label, className }: ArtProps) {
  return (
    <svg {...frame} role="img" aria-label={label} className={className}>
      <path d="M40 300h400" />
      <path d="M70 300V96h250v204" />
      <path d="M320 132h90v168" />
      <g className="text-gold" stroke="currentColor">
        <path d="M150 28v26M330 28v26" strokeWidth="1.5" />
        <rect x="120" y="54" width="240" height="30" rx="6" />
        <path d="M150 69h60M226 69h20" />
        <rect x="100" y="126" width="120" height="76" rx="6" />
        <path d="M148 150l32 14-32 14z" fill="currentColor" stroke="none" style={{ animation: "twinkle 2.6s ease-in-out infinite" }} />
        <path d="M352 168l4 10 11 1-9 7 3 11-9-6-9 6 3-11-9-7 11-1z" fill="currentColor" stroke="none" />
      </g>
      <path d="M240 300v-62h70v62M232 238h86" />
      <path d="M100 300v-40h64v40M108 260v-12h48v12" />
      <circle cx="275" cy="212" r="9" />
      <path d="M262 238c0-10 5-15 13-15s13 5 13 15" />
      <path d="M340 300v-36h52v36" />
    </svg>
  )
}

export function AdvertisingArt({ label, className }: ArtProps) {
  return (
    <svg {...frame} role="img" aria-label={label} className={className}>
      <path d="M30 312h420" />
      <path d="M130 312V190M170 312V190" />
      <g className="text-gold" stroke="currentColor">
        <rect x="46" y="48" width="208" height="142" rx="8" />
        <path d="M150 82l9 24 25 1-20 16 7 25-21-15-21 15 7-25-20-16 25-1z" fill="currentColor" stroke="none" style={{ animation: "twinkle 3.2s ease-in-out infinite" }} />
        <path d="M70 34l12 14M150 30v18M230 34l-12 14" strokeWidth="1.5" />
      </g>
      <path d="M274 300v-74a8 8 0 018-8h96l44 40v42z" />
      <path d="M378 218v40h44" />
      <circle cx="312" cy="300" r="16" />
      <circle cx="394" cy="300" r="16" />
      <g className="text-gold" stroke="currentColor">
        <path d="M292 244h62M292 260h38" />
      </g>
    </svg>
  )
}

export const artById = {
  events: EventsArt,
  exhibitions: ExhibitionsArt,
  advertising: AdvertisingArt,
} as const
