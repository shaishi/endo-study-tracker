import React from 'react';

/**
 * High-Yield Visual SVG Schemas for Endodontics Residency Prep
 * 1. Vertucci Types I to VIII Root Canal Morphology
 * 2. Dummer Apical Constriction Types A to D
 * 3. Dental Trauma & Avulsion Protocol Schema
 */

export const VertucciSchemaSVG: React.FC = () => (
  <div className="p-4 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-3 my-3">
    <div className="flex items-center justify-between">
      <span className="text-xs font-bold text-indigo-300">סיווג תעלות ורטוצי (Vertucci Types I-VIII Schema)</span>
      <span className="text-[10px] text-slate-400 font-mono">Vertucci FJ (1984)</span>
    </div>
    <svg viewBox="0 0 800 240" className="w-full h-auto text-white">
      {/* Background Grid */}
      <rect width="800" height="240" fill="#0f172a" rx="12" />
      
      {/* Type I (1) */}
      <g transform="translate(10, 20)">
        <rect x="0" y="0" width="85" height="180" rx="8" fill="#1e293b" stroke="#334155" />
        <text x="42.5" y="24" fill="#60a5fa" fontSize="12" fontWeight="bold" textAnchor="middle">Type I (1)</text>
        <path d="M42.5 40 L42.5 160" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
        <text x="42.5" y="175" fill="#94a3b8" fontSize="10" textAnchor="middle">1 → 1</text>
      </g>

      {/* Type II (2-1) */}
      <g transform="translate(105, 20)">
        <rect x="0" y="0" width="85" height="180" rx="8" fill="#1e293b" stroke="#334155" />
        <text x="42.5" y="24" fill="#60a5fa" fontSize="12" fontWeight="bold" textAnchor="middle">Type II (2-1)</text>
        <path d="M25 40 L42.5 110 L42.5 160" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
        <path d="M60 40 L42.5 110" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
        <text x="42.5" y="175" fill="#94a3b8" fontSize="10" textAnchor="middle">2 → 1</text>
      </g>

      {/* Type III (1-2-1) */}
      <g transform="translate(200, 20)">
        <rect x="0" y="0" width="85" height="180" rx="8" fill="#1e293b" stroke="#334155" />
        <text x="42.5" y="24" fill="#60a5fa" fontSize="12" fontWeight="bold" textAnchor="middle">Type III (1-2-1)</text>
        <path d="M42.5 40 L42.5 70 L25 110 L42.5 150 L42.5 160" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
        <path d="M42.5 70 L60 110 L42.5 150" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
        <text x="42.5" y="175" fill="#94a3b8" fontSize="10" textAnchor="middle">1 → 2 → 1</text>
      </g>

      {/* Type IV (2) */}
      <g transform="translate(295, 20)">
        <rect x="0" y="0" width="85" height="180" rx="8" fill="#1e293b" stroke="#334155" />
        <text x="42.5" y="24" fill="#60a5fa" fontSize="12" fontWeight="bold" textAnchor="middle">Type IV (2)</text>
        <path d="M28 40 L28 160" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
        <path d="M57 40 L57 160" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
        <text x="42.5" y="175" fill="#94a3b8" fontSize="10" textAnchor="middle">2 → 2</text>
      </g>

      {/* Type V (1-2) */}
      <g transform="translate(390, 20)">
        <rect x="0" y="0" width="85" height="180" rx="8" fill="#1e293b" stroke="#334155" />
        <text x="42.5" y="24" fill="#60a5fa" fontSize="12" fontWeight="bold" textAnchor="middle">Type V (1-2)</text>
        <path d="M42.5 40 L42.5 90 L25 160" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
        <path d="M42.5 90 L60 160" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
        <text x="42.5" y="175" fill="#94a3b8" fontSize="10" textAnchor="middle">1 → 2</text>
      </g>

      {/* Type VI (2-1-2) */}
      <g transform="translate(485, 20)">
        <rect x="0" y="0" width="85" height="180" rx="8" fill="#1e293b" stroke="#334155" />
        <text x="42.5" y="24" fill="#60a5fa" fontSize="12" fontWeight="bold" textAnchor="middle">Type VI (2-1-2)</text>
        <path d="M25 40 L42.5 85 L42.5 120 L25 160" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
        <path d="M60 40 L42.5 85 L42.5 120 L60 160" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
        <text x="42.5" y="175" fill="#94a3b8" fontSize="10" textAnchor="middle">2 → 1 → 2</text>
      </g>

      {/* Type VII (1-2-1-2) */}
      <g transform="translate(580, 20)">
        <rect x="0" y="0" width="85" height="180" rx="8" fill="#1e293b" stroke="#334155" />
        <text x="42.5" y="22" fill="#60a5fa" fontSize="10" fontWeight="bold" textAnchor="middle">Type VII (1-2-1-2)</text>
        <path d="M42.5 38 L42.5 60 L25 90 L42.5 120 L25 160" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M42.5 60 L60 90 L42.5 120 L60 160" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
        <text x="42.5" y="175" fill="#94a3b8" fontSize="9" textAnchor="middle">1→2→1→2</text>
      </g>

      {/* Type VIII (3) */}
      <g transform="translate(675, 20)">
        <rect x="0" y="0" width="85" height="180" rx="8" fill="#1e293b" stroke="#334155" />
        <text x="42.5" y="24" fill="#60a5fa" fontSize="12" fontWeight="bold" textAnchor="middle">Type VIII (3)</text>
        <path d="M20 40 L20 160" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M42.5 40 L42.5 160" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M65 40 L65 160" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
        <text x="42.5" y="175" fill="#94a3b8" fontSize="10" textAnchor="middle">3 → 3</text>
      </g>
    </svg>
  </div>
);

export const DummerApicalConstrictionSVG: React.FC = () => (
  <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-3 my-3">
    <div className="flex items-center justify-between">
      <span className="text-xs font-bold text-cyan-300">טיפוסי הקונסטריקציה האפיקלית (Dummer Apical Types A-D)</span>
      <span className="text-[10px] text-slate-400 font-mono">Dummer PM et al. (1984)</span>
    </div>
    <svg viewBox="0 0 600 200" className="w-full h-auto text-white">
      <rect width="600" height="200" fill="#0f172a" rx="12" />

      {/* Type A: Traditional Single Constriction */}
      <g transform="translate(20, 20)">
        <rect x="0" y="0" width="125" height="160" rx="8" fill="#1e293b" stroke="#334155" />
        <text x="62.5" y="24" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Type A: Traditional</text>
        <path d="M25 40 L50 110 L25 150 M100 40 L75 110 L100 150" stroke="#f43f5e" strokeWidth="3" fill="none" />
        <circle cx="62.5" cy="110" r="4" fill="#38bdf8" />
        <text x="62.5" y="140" fill="#cbd5e1" fontSize="9" textAnchor="middle">Single Constriction</text>
      </g>

      {/* Type B: Tapered Constriction */}
      <g transform="translate(160, 20)">
        <rect x="0" y="0" width="125" height="160" rx="8" fill="#1e293b" stroke="#334155" />
        <text x="62.5" y="24" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Type B: Tapered</text>
        <path d="M25 40 L55 145 L25 150 M100 40 L70 145 L100 150" stroke="#f43f5e" strokeWidth="3" fill="none" />
        <text x="62.5" y="140" fill="#cbd5e1" fontSize="9" textAnchor="middle">Narrowest at Apex</text>
      </g>

      {/* Type C: Multiconstricted */}
      <g transform="translate(300, 20)">
        <rect x="0" y="0" width="125" height="160" rx="8" fill="#1e293b" stroke="#334155" />
        <text x="62.5" y="24" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Type C: Multi-constricted</text>
        <path d="M25 40 L50 80 L35 105 L55 130 L25 150 M100 40 L75 80 L90 105 L70 130 L100 150" stroke="#f43f5e" strokeWidth="3" fill="none" />
        <text x="62.5" y="140" fill="#cbd5e1" fontSize="9" textAnchor="middle">Multiple Constrictions</text>
      </g>

      {/* Type D: Parallel Canals */}
      <g transform="translate(440, 20)">
        <rect x="0" y="0" width="125" height="160" rx="8" fill="#1e293b" stroke="#334155" />
        <text x="62.5" y="24" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Type D: Parallel</text>
        <path d="M45 40 L45 150 M80 40 L80 150" stroke="#f43f5e" strokeWidth="3" fill="none" />
        <text x="62.5" y="140" fill="#cbd5e1" fontSize="9" textAnchor="middle">No Constriction</text>
      </g>
    </svg>
  </div>
);
