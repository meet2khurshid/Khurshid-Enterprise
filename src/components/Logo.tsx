import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light' | 'auto';
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  iconOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'dark',
  showSubtitle = true,
  size = 'md',
  iconOnly = false,
}) => {
  // Height presets
  const heightClasses = {
    sm: 'h-8',
    md: 'h-10 sm:h-11',
    lg: 'h-14 sm:h-16',
    xl: 'h-20',
  };

  const isDark = variant === 'dark';

  if (iconOnly) {
    return (
      <svg
        viewBox="0 0 200 180"
        className={`${heightClasses[size]} w-auto aspect-[200/180] ${className}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="keArrowGradIcon" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#0284C7" />
            <stop offset="40%" stop-color="#0EA5E9" />
            <stop offset="75%" stop-color="#38BDF8" />
            <stop offset="100%" stop-color="#E0F2FE" />
          </linearGradient>

          <linearGradient id="keNavyGradIcon" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color={isDark ? '#1E3A8A' : '#0C3466'} />
            <stop offset="50%" stop-color={isDark ? '#172554' : '#082347'} />
            <stop offset="100%" stop-color={isDark ? '#0F172A' : '#04142B'} />
          </linearGradient>
        </defs>

        <g>
          {/* Circuit nodes */}
          <rect x="28" y="48" width="10" height="10" fill="#38BDF8" rx="1.5" />
          <path d="M38 53 H 48" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
          
          <rect x="42" y="32" width="9" height="9" fill="#38BDF8" rx="1.5" />
          <path d="M46 41 V 58 H 54" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />

          <circle cx="26" cy="98" r="4.5" fill="#38BDF8" />
          <path d="M31 98 H 54" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
          
          <rect x="18" y="74" width="8" height="8" fill="#0284C7" rx="1.5" />
          <path d="M26 78 H 38 V 92 H 54" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

          <circle cx="32" cy="138" r="4" fill="#0284C7" />
          <path d="M36 138 H 54" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />

          {/* Vertical Stem */}
          <path d="M54 48 H 76 V 162 H 54 Z" fill="url(#keNavyGradIcon)" stroke={isDark ? '#2563EB' : 'none'} strokeWidth="1" />
          <path d="M65 58 V 150" stroke="#38BDF8" strokeWidth="2" strokeDasharray="8 6" opacity="0.8" />

          {/* Base of E */}
          <path d="M76 132 L 118 162 H 168 V 142 H 106 L 86 128 Z" fill="url(#keNavyGradIcon)" stroke={isDark ? '#2563EB' : 'none'} strokeWidth="1" />

          {/* Middle bar of E */}
          <path d="M96 98 H 158 V 118 H 108 Z" fill="url(#keNavyGradIcon)" stroke={isDark ? '#2563EB' : 'none'} strokeWidth="1" />

          {/* Arrow */}
          <path d="M54 132 L 126 58 L 152 78 L 88 144 Z" fill="#0369A1" />
          <path d="M54 122 L 122 46 L 150 70 L 166 40 L 140 18 L 114 40 L 76 82 L 54 104 Z" fill="url(#keArrowGradIcon)" />
          
          {/* Arrowhead */}
          <polygon points="182,10 134,22 152,42 124,70 148,88 174,58 190,74" fill="url(#keArrowGradIcon)" />
          <polygon points="182,10 148,88 140,82 170,48" fill="#38BDF8" opacity="0.8" />
          <polygon points="182,10 134,22 144,34 168,26" fill="#FFFFFF" />
        </g>
      </svg>
    );
  }

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official Emblem */}
      <svg
        viewBox="0 0 200 180"
        className={`${heightClasses[size]} w-auto aspect-[200/180] shrink-0 drop-shadow-md`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`keArrowGrad-${variant}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="40%" stopColor="#0EA5E9" />
            <stop offset="75%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#BAE6FD" />
          </linearGradient>

          <linearGradient id={`keNavyGrad-${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isDark ? '#1E3A8A' : '#0C3466'} />
            <stop offset="50%" stopColor={isDark ? '#172554' : '#082347'} />
            <stop offset="100%" stopColor={isDark ? '#0F172A' : '#04142B'} />
          </linearGradient>
        </defs>

        <g>
          {/* Circuit nodes & traces */}
          <rect x="28" y="48" width="10" height="10" fill="#38BDF8" rx="1.5" />
          <path d="M38 53 H 48" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
          
          <rect x="42" y="32" width="9" height="9" fill="#38BDF8" rx="1.5" />
          <path d="M46 41 V 58 H 54" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />

          <circle cx="26" cy="98" r="4.5" fill="#38BDF8" />
          <path d="M31 98 H 54" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
          
          <rect x="18" y="74" width="8" height="8" fill="#0284C7" rx="1.5" />
          <path d="M26 78 H 38 V 92 H 54" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

          <circle cx="32" cy="138" r="4" fill="#0284C7" />
          <path d="M36 138 H 54" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />

          {/* Vertical Stem */}
          <path d="M54 48 H 76 V 162 H 54 Z" fill={`url(#keNavyGrad-${variant})`} stroke={isDark ? '#2563EB' : 'none'} strokeWidth="1" />
          <path d="M65 58 V 150" stroke="#38BDF8" strokeWidth="2" strokeDasharray="8 6" opacity="0.8" />

          {/* Base of E */}
          <path d="M76 132 L 118 162 H 168 V 142 H 106 L 86 128 Z" fill={`url(#keNavyGrad-${variant})`} stroke={isDark ? '#2563EB' : 'none'} strokeWidth="1" />

          {/* Middle bar of E */}
          <path d="M96 98 H 158 V 118 H 108 Z" fill={`url(#keNavyGrad-${variant})`} stroke={isDark ? '#2563EB' : 'none'} strokeWidth="1" />

          {/* Arrow */}
          <path d="M54 132 L 126 58 L 152 78 L 88 144 Z" fill="#0369A1" />
          <path d="M54 122 L 122 46 L 150 70 L 166 40 L 140 18 L 114 40 L 76 82 L 54 104 Z" fill={`url(#keArrowGrad-${variant})`} />
          
          {/* Arrowhead */}
          <polygon points="182,10 134,22 152,42 124,70 148,88 174,58 190,74" fill={`url(#keArrowGrad-${variant})`} />
          <polygon points="182,10 148,88 140,82 170,48" fill="#38BDF8" opacity="0.8" />
          <polygon points="182,10 134,22 144,34 168,26" fill="#FFFFFF" />
        </g>
      </svg>

      {/* Brand Typography */}
      <div className="flex flex-col leading-tight">
        <div className="flex flex-col font-heading">
          <span
            className={`font-black tracking-tight uppercase text-sm sm:text-base md:text-lg ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            KHURSHID
          </span>
          <span
            className={`font-black tracking-wider uppercase text-xs sm:text-sm md:text-base -mt-1 ${
              isDark ? 'text-slate-200' : 'text-slate-800'
            }`}
          >
            ENTERPRISE
          </span>
        </div>

        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-3 h-0.5 rounded-full bg-cyan-400" />
            <span
              className={`text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-bold ${
                isDark ? 'text-cyan-400' : 'text-sky-700'
              }`}
            >
              Digital Solutions
            </span>
            <span className="w-3 h-0.5 rounded-full bg-cyan-400" />
          </div>
        )}
      </div>
    </div>
  );
};
