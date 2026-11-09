/* Hand-drawn road signs, carried across unchanged from the original app. */

interface SignProps {
  label: string;
  className?: string;
}

export function StopSign({ label, className }: SignProps) {
  return (
    <svg viewBox="0 0 120 120" role="img" aria-label={label} className={className}>
      <polygon
        points="37,8 83,8 112,37 112,83 83,112 37,112 8,83 8,37"
        fill="#C8102E"
        stroke="#fff"
        strokeWidth="5"
      />
      <text
        x="60"
        y="72"
        textAnchor="middle"
        fontFamily="Barlow Condensed, Arial Narrow, sans-serif"
        fontWeight="700"
        fontSize="34"
        fill="#fff"
      >
        STOP
      </text>
    </svg>
  );
}

export function GivewaySign({ label, className }: SignProps) {
  return (
    <svg viewBox="0 0 120 120" role="img" aria-label={label} className={className}>
      <polygon points="8,14 112,14 60,110" fill="#fff" stroke="#C8102E" strokeWidth="9" />
      <text
        x="60"
        y="47"
        textAnchor="middle"
        fontFamily="Barlow Condensed, Arial Narrow, sans-serif"
        fontWeight="700"
        fontSize="19"
        fill="#141414"
      >
        GIVE
      </text>
      <text
        x="60"
        y="68"
        textAnchor="middle"
        fontFamily="Barlow Condensed, Arial Narrow, sans-serif"
        fontWeight="700"
        fontSize="19"
        fill="#141414"
      >
        WAY
      </text>
    </svg>
  );
}

export function RoundaboutSign({ label, className }: SignProps) {
  return (
    <svg viewBox="0 0 120 120" role="img" aria-label={label} className={className}>
      <g transform="rotate(45 60 60)">
        <rect
          x="18"
          y="18"
          width="84"
          height="84"
          rx="7"
          fill="#F5C518"
          stroke="#141414"
          strokeWidth="5"
        />
      </g>
      <circle cx="60" cy="60" r="15" fill="none" stroke="#141414" strokeWidth="5" />
      <path d="M60 30 v10" stroke="#141414" strokeWidth="5" />
      <path d="M84 74 l-9 -5" stroke="#141414" strokeWidth="5" />
      <path d="M36 74 l9 -5" stroke="#141414" strokeWidth="5" />
      <polygon points="60,26 55,36 65,36" fill="#141414" />
    </svg>
  );
}

export function CrossroadsSign({ label, className }: SignProps) {
  return (
    <svg viewBox="0 0 120 120" role="img" aria-label={label} className={className}>
      <g transform="rotate(45 60 60)">
        <rect
          x="18"
          y="18"
          width="84"
          height="84"
          rx="7"
          fill="#F5C518"
          stroke="#141414"
          strokeWidth="5"
        />
      </g>
      <path d="M60 30 v60 M30 60 h60" stroke="#141414" strokeWidth="7" />
    </svg>
  );
}

export function TjunctionSign({ label, className }: SignProps) {
  return (
    <svg viewBox="0 0 120 120" role="img" aria-label={label} className={className}>
      <g transform="rotate(45 60 60)">
        <rect
          x="18"
          y="18"
          width="84"
          height="84"
          rx="7"
          fill="#F5C518"
          stroke="#141414"
          strokeWidth="5"
        />
      </g>
      <path d="M30 48 h60 M60 48 v42" stroke="#141414" strokeWidth="7" />
    </svg>
  );
}

export function SlipperySign({ label, className }: SignProps) {
  return (
    <svg viewBox="0 0 120 120" role="img" aria-label={label} className={className}>
      <g transform="rotate(45 60 60)">
        <rect
          x="18"
          y="18"
          width="84"
          height="84"
          rx="7"
          fill="#F5C518"
          stroke="#141414"
          strokeWidth="5"
        />
      </g>
      <rect
        x="47"
        y="38"
        width="26"
        height="40"
        rx="5"
        fill="none"
        stroke="#141414"
        strokeWidth="5"
      />
      <path
        d="M40 88 q8 -8 0 -16 M80 88 q-8 -8 0 -16"
        stroke="#141414"
        strokeWidth="4"
        fill="none"
      />
    </svg>
  );
}

export function AnimalSign({ label, className }: SignProps) {
  return (
    <svg viewBox="0 0 120 120" role="img" aria-label={label} className={className}>
      <g transform="rotate(45 60 60)">
        <rect
          x="18"
          y="18"
          width="84"
          height="84"
          rx="7"
          fill="#F5C518"
          stroke="#141414"
          strokeWidth="5"
        />
      </g>
      <path
        d="M52 84 l0 -16 q-6 -6 -2 -14 q4 -8 12 -8 q4 -8 10 -6 l-2 8 q6 4 6 12 l0 24 M62 84 l0 -14"
        stroke="#141414"
        strokeWidth="4.5"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="74" cy="49" r="1.6" fill="#141414" />
    </svg>
  );
}

export function Speed60Sign({ label, className }: SignProps) {
  return (
    <svg viewBox="0 0 120 120" role="img" aria-label={label} className={className}>
      <circle cx="60" cy="60" r="52" fill="#fff" stroke="#C8102E" strokeWidth="11" />
      <text
        x="60"
        y="79"
        textAnchor="middle"
        fontFamily="Barlow Condensed, Arial Narrow, sans-serif"
        fontWeight="700"
        fontSize="58"
        fill="#141414"
      >
        60
      </text>
    </svg>
  );
}

export function SchoolSign({ label, className }: SignProps) {
  return (
    <svg viewBox="0 0 120 120" role="img" aria-label={label} className={className}>
      <rect
        x="10"
        y="6"
        width="100"
        height="108"
        rx="6"
        fill="#F5C518"
        stroke="#141414"
        strokeWidth="4"
      />
      <circle cx="60" cy="52" r="33" fill="#fff" stroke="#C8102E" strokeWidth="9" />
      <text
        x="60"
        y="68"
        textAnchor="middle"
        fontFamily="Barlow Condensed, Arial Narrow, sans-serif"
        fontWeight="700"
        fontSize="38"
        fill="#141414"
      >
        40
      </text>
      <text
        x="60"
        y="103"
        textAnchor="middle"
        fontFamily="Barlow Condensed, Arial Narrow, sans-serif"
        fontWeight="700"
        fontSize="17"
        fill="#141414"
      >
        SCHOOL ZONE
      </text>
    </svg>
  );
}

export function NoentrySign({ label, className }: SignProps) {
  return (
    <svg viewBox="0 0 120 120" role="img" aria-label={label} className={className}>
      <circle cx="60" cy="60" r="52" fill="#C8102E" stroke="#fff" strokeWidth="5" />
      <rect x="24" y="50" width="72" height="20" fill="#fff" />
    </svg>
  );
}

export function NouturnSign({ label, className }: SignProps) {
  return (
    <svg viewBox="0 0 120 120" role="img" aria-label={label} className={className}>
      <circle cx="60" cy="60" r="52" fill="#fff" stroke="#C8102E" strokeWidth="10" />
      <path d="M45 84 V57 a15 15 0 0 1 30 0 v20" fill="none" stroke="#141414" strokeWidth="7" />
      <polygon points="66,76 84,76 75,92" fill="#141414" />
      <line x1="22" y1="98" x2="98" y2="22" stroke="#C8102E" strokeWidth="10" />
    </svg>
  );
}

export function PedestrianSign({ label, className }: SignProps) {
  return (
    <svg viewBox="0 0 120 120" role="img" aria-label={label} className={className}>
      <g transform="rotate(45 60 60)">
        <rect
          x="18"
          y="18"
          width="84"
          height="84"
          rx="7"
          fill="#F5C518"
          stroke="#141414"
          strokeWidth="5"
        />
      </g>
      <circle cx="60" cy="38" r="6" fill="#141414" />
      <path
        d="M60 46 v20 M60 52 l-11 8 M60 52 l11 6 M60 66 l-8 20 M60 66 l9 20"
        stroke="#141414"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function RailwaySign({ label, className }: SignProps) {
  return (
    <svg viewBox="0 0 120 120" role="img" aria-label={label} className={className}>
      <path d="M60 12 L20 96 M60 12 L100 96" stroke="#141414" strokeWidth="4" fill="none" />
      <g transform="rotate(45 60 60)">
        <rect x="14" y="52" width="92" height="16" fill="#fff" stroke="#141414" strokeWidth="4" />
      </g>
      <g transform="rotate(-45 60 60)">
        <rect x="14" y="52" width="92" height="16" fill="#fff" stroke="#141414" strokeWidth="4" />
      </g>
    </svg>
  );
}
