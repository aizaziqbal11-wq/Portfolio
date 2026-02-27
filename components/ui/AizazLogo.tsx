interface AizazLogoProps {
  className?: string
}

export default function AizazLogo({ className = '' }: AizazLogoProps) {
  return (
    <svg
      viewBox="0 0 200 48"
      width="200"
      height="48"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Main gradient */}
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5b5ef4" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>

        {/* Accent gradient */}
        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5b5ef4" />
          <stop offset="100%" stopColor="#8b7cf8" />
        </linearGradient>

        {/* Icon gradient */}
        <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>

        {/* Glow filter */}
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Strong glow for icon */}
        <filter id="iconGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Pulse animation */}
        <style>{`
          @keyframes logoPulse {
            0%, 100% { opacity: 0.7; r: 2.5px; }
            50%       { opacity: 1;   r: 3.5px; }
          }
          @keyframes logoLine {
            0%, 100% { opacity: 0.3; }
            50%       { opacity: 0.7; }
          }
          @keyframes logoGlow {
            0%, 100% { opacity: 0.15; }
            50%       { opacity: 0.35; }
          }
          .logo-dot   { animation: logoPulse 2.8s ease-in-out infinite; }
          .logo-line  { animation: logoLine  2.8s ease-in-out infinite; }
          .logo-halo  { animation: logoGlow  2.8s ease-in-out infinite; }
        `}</style>
      </defs>

      {/* ── Icon mark — left side ─────────────────────────────── */}
      {/* Outer hexagon-like shape */}
      <rect
        x="4" y="6"
        width="36" height="36"
        rx="10"
        fill="url(#iconGrad)"
        filter="url(#iconGlow)"
        opacity="0.12"
        className="logo-halo"
      />
      <rect
        x="4" y="6"
        width="36" height="36"
        rx="10"
        fill="none"
        stroke="url(#grad2)"
        strokeWidth="1.2"
        opacity="0.5"
      />

      {/* "A" lettermark inside box */}
      <text
        x="22"
        y="32"
        fontFamily="'Courier New', monospace"
        fontSize="22"
        fontWeight="800"
        fill="url(#grad1)"
        textAnchor="middle"
        filter="url(#glow)"
        letterSpacing="-1"
      >
        A
      </text>

      {/* Small "i" superscript — AI reference */}
      <text
        x="34"
        y="18"
        fontFamily="'Courier New', monospace"
        fontSize="9"
        fontWeight="700"
        fill="#a78bfa"
        textAnchor="middle"
        opacity="0.9"
      >
        i
      </text>

      {/* ── Wordmark — right side ─────────────────────────────── */}
      {/* "aizaz" full name */}
      <text
        x="52"
        y="31"
        fontFamily="'Courier New', 'JetBrains Mono', monospace"
        fontSize="19"
        fontWeight="700"
        fill="url(#grad1)"
        letterSpacing="0.5"
        filter="url(#glow)"
      >
        aizaz
      </text>

      {/* Tagline under name */}
      <text
        x="53"
        y="42"
        fontFamily="'Courier New', monospace"
        fontSize="6.5"
        fontWeight="400"
        fill="#8b7cf8"
        letterSpacing="2.5"
        opacity="0.75"
      >
        AI ENGINEER
      </text>

      {/* ── Divider line between icon and text ───────────────── */}
      <line
        x1="46"
        y1="12"
        x2="46"
        y2="36"
        stroke="url(#grad2)"
        strokeWidth="0.8"
        opacity="0.25"
        className="logo-line"
      />

      {/* ── Accent dots ──────────────────────────────────────── */}
      {/* Pulsing dot — top right */}
      <circle
        cx="186"
        cy="12"
        r="2.5"
        fill="#5b5ef4"
        filter="url(#iconGlow)"
        className="logo-dot"
      />
      {/* Static smaller dot */}
      <circle
        cx="193"
        cy="12"
        r="1.5"
        fill="#a78bfa"
        opacity="0.45"
      />

      {/* Bottom accent line under wordmark */}
      <line
        x1="52"
        y1="45"
        x2="130"
        y2="45"
        stroke="url(#grad2)"
        strokeWidth="0.8"
        className="logo-line"
      />
    </svg>
  )
}