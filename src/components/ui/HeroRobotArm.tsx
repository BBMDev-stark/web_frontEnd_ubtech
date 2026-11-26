const fingers = [
  { name: "little", x: 87, y: 130, length: 0.78 },
  { name: "ring", x: 119, y: 120, length: 0.96 },
  { name: "middle", x: 151, y: 116, length: 1 },
  { name: "index", x: 183, y: 124, length: 0.91 },
];

// The panel and foreground render the same hem in the hand's contact pose.
const curtainHem = "M22 64C48 78 68 89 86 85C101 82 109 69 121 64C131 60 140 56 151 56C167 57 174 68 185 71C208 78 232 73 258 59";

export function HeroCurtainFold({ foreground = false }: { foreground?: boolean }) {
  return (
    <svg
      className={`hap-hand-position hap-curtain-fold ${foreground ? "hap-curtain-fold-front" : "hap-curtain-fold-back"}`}
      viewBox="0 0 280 330"
      aria-hidden="true"
      focusable="false"
    >
      {foreground ? (
        <>
          <path d={`${curtainHem}L258 62C232 81 207 86 183 78C172 74 165 65 151 64C139 63 132 67 122 71C110 77 103 90 87 92C68 96 47 86 22 67Z`} fill="#264b77" stroke="#15355d" strokeWidth="1" />
          <path d={curtainHem} fill="none" stroke="#7895b8" strokeOpacity=".55" strokeWidth="1.5" />
        </>
      ) : (
        <>
          <defs>
            <linearGradient id="hero-curtain-fold" x1="0" y1="9" x2="0" y2="85" gradientUnits="userSpaceOnUse">
              <stop stopColor="#426a9d" stopOpacity="0" />
              <stop offset=".54" stopColor="#426a9d" stopOpacity=".36" />
              <stop offset=".83" stopColor="#305989" />
              <stop offset="1" stopColor="#142e59" />
            </linearGradient>
          </defs>
          <path d={`${curtainHem}V9H22Z`} fill="url(#hero-curtain-fold)" />
          <path d={curtainHem} fill="none" stroke="#17345c" strokeWidth="7" strokeOpacity=".66" />
        </>
      )}
    </svg>
  );
}

export default function HeroRobotArm() {
  return (
    <div className="hap-arm-track" aria-hidden="true">
      <div className="hap-hand-position hap-arm">
        <svg viewBox="0 0 280 330" focusable="false">
          <defs>
            <linearGradient id="hero-hand-shell" x2="1" y2=".7">
              <stop stopColor="#f8fcff" />
              <stop offset=".49" stopColor="#dce7f0" />
              <stop offset=".79" stopColor="#a1b5cb" />
              <stop offset="1" stopColor="#657e9b" />
            </linearGradient>
            <linearGradient id="hero-hand-frame" x2="1" y2=".45">
              <stop stopColor="#3a506d" />
              <stop offset=".56" stopColor="#23344d" />
              <stop offset="1" stopColor="#101d2e" />
            </linearGradient>
            <linearGradient id="hero-hand-blue" x2="1" y2=".8">
              <stop stopColor="#93ecff" />
              <stop offset=".41" stopColor="#389dd4" />
              <stop offset="1" stopColor="#275287" />
            </linearGradient>
          </defs>

          {/* Forearm shell and wrist coupling */}
          <path d="m55 490 47-254 17-19 49 1 25 24 34 248Z" fill="url(#hero-hand-frame)" stroke="#7091af" strokeWidth="2" />
          <path d="M63 490 105 248l21-19 38 2 20 21 24 238Z" fill="url(#hero-hand-shell)" stroke="#9db5c9" strokeWidth="2" />
          <path d="m105 297 10-43 15-13 31 1 14 15 6 26-11 11-46 1Z" fill="#274463" />
          <path d="m115 283 7-25 12-9 23 1 11 12 4 17-7 5Z" fill="url(#hero-hand-blue)" />
          <path d="m96 319 7-29m84-1 5 32" fill="none" stroke="#eff8ff" strokeWidth="2" />
          <path d="M112 219h55v24l-10 10h-33l-12-10Z" fill="url(#hero-hand-frame)" stroke="#7f9bb5" strokeWidth="2" />
          <path d="M120 232h40m-34 8h29" stroke="#7090ad" strokeWidth="2" strokeLinecap="round" />

          <g className="hap-hand-wrist">
            {/* Dark tendons remain visible between the white finger shells. */}
            {fingers.map(({ name, x, y, length }) => (
              <g key={name} transform={`translate(${x} ${y}) scale(1 ${length})`}>
                <g className="hap-hand-digit" data-finger={name}>
                  <path d="M-14 8v-44l5-8H8l7 9-1 44Z" fill="url(#hero-hand-frame)" stroke="#7a96b0" strokeWidth="2" />
                  <path d="M-13-30v-10l5-10H8l6 8v15l-5 8H-7Z" fill="url(#hero-hand-shell)" stroke="#899fb7" strokeWidth="1.5" />
                  <path d="M-7-40h13" stroke="#f4fcff" strokeWidth="2" strokeLinecap="round" />
                  <g className="hap-hand-fingertip">
                    <path d="M-13-43v-16l3-18 6-7H6l7 8 1 22-5 12Z" fill="url(#hero-hand-frame)" stroke="#819ab5" strokeWidth="1.5" />
                    <path d="m-12-60 2-17 6-7H6l7 8v15l-5 8H-7Z" fill="url(#hero-hand-shell)" stroke="#a0b6cb" strokeWidth="1.5" />
                    <path d="m-7-74 4-5h7" fill="none" stroke="#f6fbff" strokeWidth="2" strokeLinecap="round" />
                    <path d="M-7-59H8" stroke="#406180" strokeWidth="2" strokeLinecap="round" />
                  </g>
                </g>
              </g>
            ))}

            <g className="hap-hand-thumb">
              <path d="m185 165 21-30 21-18 21 3 5 13-8 15-14 7-12 29-21 21Z" fill="url(#hero-hand-frame)" stroke="#809ab6" strokeWidth="2" />
              <path d="m205 145 11-9 15 7-7 22-15 18-15-6Z" fill="url(#hero-hand-shell)" stroke="#9db4cb" strokeWidth="2" />
              <path d="m229 121 14-6 11 8 1 10-7 12-11 3-13-11Z" fill="url(#hero-hand-shell)" stroke="#a0b7cc" strokeWidth="2" />
              <path d="m237 124 8-3 5 4m-19 14 12 6" fill="none" stroke="#d9f0fa" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* Palm frame, knuckles and raised outer plate */}
            <path d="m69 119 13-9 22 4 19-9 25 2 19 3 22 4 13 13 7 24-7 31-20 23-14 20-12 8-30-3-19-12-24-22-14-29-4-32Z" fill="url(#hero-hand-frame)" stroke="#7793af" strokeWidth="2" />
            <path d="m78 121 9-5 17 6 20-10 23 2 19 3 20 5 12 13-5 34-14 22-24 24-29-3-34-22-14-23-5-32Z" fill="url(#hero-hand-shell)" stroke="#9fb7ce" strokeWidth="2" />
            <path d="m86 147 9-11 30-11 34 2 23 12 2 20-12 18-31 13-28-9-20-13Z" fill="#67819f" />
            <path d="m89 146 10-9 28-9 30 2 21 11 2 14-12 18-27 11-27-8-19-13Z" fill="url(#hero-hand-shell)" stroke="#edf8ff" strokeWidth="1.5" />
            <path d="m122 151 24-5 16 7-3 5-15-4-20 4Z" fill="url(#hero-hand-blue)" />
            <path d="M96 188l17 12m47 3 15-12" stroke="#6b86a2" strokeWidth="2" strokeLinecap="round" />
            <path d="m113 216 15 9 28 2 13-11-12 18-22 5-21-10Z" fill="url(#hero-hand-blue)" stroke="#375e86" strokeWidth="1.5" />
            <circle cx="85" cy="135" r="2.5" fill="#38526d" />
            <circle cx="189" cy="142" r="2.5" fill="#38526d" />
            <circle cx="139" cy="204" r="2.5" fill="#38526d" />
          </g>
        </svg>
      </div>
      <HeroCurtainFold foreground />
    </div>
  );
}
