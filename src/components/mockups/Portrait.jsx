// Friendly flat avatar (messy hair, big brown eyes, freckles, hoodie over a tee). Drawn in a 320x240 box with the
// head centred at x=160. `animated` adds the hooks used by the face-signal loop:
//   .fm-head   the head, pivoting from the base of the neck so the two always stay joined
//   .fm-pupils the eyes, which can glance left and right
export const PALETTES = {
  main: { skin: '#f2bf9b', shade: '#d9946f', hair: '#16161c', hood: '#f9a540', hoodShade: '#d9822a', tee: '#5b8ea6', iris: '#6b3a1f', glasses: false, frame: '#2a1410' },
  other: { skin: '#e9b48f', shade: '#c98d68', hair: '#5a3320', hood: '#c13a3a', hoodShade: '#8f2323', tee: '#f2e6e2', iris: '#3a2a1f', glasses: false, frame: '#2a1410' },
  c: { skin: '#f6d0b4', shade: '#dba583', hair: '#d6a54b', hood: '#5a8f7b', hoodShade: '#3d6b59', tee: '#e9f1f4', iris: '#3f7fb0', glasses: true, frame: '#2a1410' },
  d: { skin: '#ab7650', shade: '#85553a', hair: '#0c0806', hood: '#6b4c8a', hoodShade: '#4d3566', tee: '#e9dff5', iris: '#2a170d', glasses: false, frame: '#2a1410' },
  e: { skin: '#f0bd9d', shade: '#cf8f6e', hair: '#8a3b1f', hood: '#2f7a6f', hoodShade: '#1f574f', tee: '#f3f0e6', iris: '#5b7f4f', glasses: true, frame: '#222' },
  f: { skin: '#8d5c3b', shade: '#6a4029', hair: '#0a0a0a', hood: '#cfcfcf', hoodShade: '#a8a8a8', tee: '#9a2323', iris: '#2a170d', glasses: false, frame: '#222' },
};

export default function Portrait({ p = PALETTES.main, animated = false }) {
  return (
    <g>
      {/* hoodie body, hood collar, tee and drawstrings */}
      <path d="M36 300C40 232 90 196 140 192L160 214L180 192C230 196 280 232 284 300Z" fill={p.hood} />
      <path d="M88 216C102 196 126 188 144 190L160 216L176 190C194 188 218 196 232 216C216 208 198 208 184 212L160 236L136 212C122 208 104 208 88 216Z" fill={p.hoodShade} />
      <path d="M137 196C146 208 174 208 183 196L184 244H136Z" fill={p.tee} />
      <path d="M126 218V252M194 218V252" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" opacity="0.9" />
      <circle cx="126" cy="254" r="3" fill="#fff" opacity="0.9" /><circle cx="194" cy="254" r="3" fill="#fff" opacity="0.9" />

      {/* neck: runs up behind the head so a moving head never leaves a gap */}
      <path d="M144 120H176V190C170 200 150 200 144 190Z" fill={p.skin} />
      <ellipse cx="160" cy="172" rx="21" ry="11" fill={p.shade} opacity="0.85" />

      <g className={animated ? 'fm-head' : undefined}>
        {/* ears */}
        <ellipse cx="123" cy="110" rx="8" ry="13" fill={p.skin} />
        <ellipse cx="197" cy="110" rx="8" ry="13" fill={p.skin} />
        <ellipse cx="124" cy="111" rx="3.6" ry="8" fill={p.shade} opacity="0.5" />
        <ellipse cx="196" cy="111" rx="3.6" ry="8" fill={p.shade} opacity="0.5" />

        {/* face */}
        <path d="M122 90C122 66 138 54 160 54C182 54 198 66 198 90V112C198 142 182 166 160 170C138 166 122 142 122 112Z" fill={p.skin} />
        <circle cx="135" cy="126" r="8" fill="#ee8f84" opacity="0.28" />
        <circle cx="185" cy="126" r="8" fill="#ee8f84" opacity="0.28" />
        <g fill={p.shade} opacity="0.7">
          <circle cx="134" cy="118" r="1.1" /><circle cx="139" cy="122" r="1.1" /><circle cx="144" cy="118" r="1.1" />
          <circle cx="176" cy="118" r="1.1" /><circle cx="181" cy="122" r="1.1" /><circle cx="186" cy="118" r="1.1" />
        </g>

        {/* hair: messy cap with a swept fringe and a forelock curl */}
        <path d="M116 114C104 64 126 26 164 26C204 26 222 66 207 116C207 100 201 88 193 80C176 66 150 66 134 82C126 90 122 102 116 114Z" fill={p.hair} />
        <path d="M130 84C142 60 172 54 196 80C178 70 152 72 130 84Z" fill={p.hair} />
        <path d="M152 68C158 56 178 56 186 72C176 64 164 66 152 68Z" fill={p.hair} />
        <path d="M144 28L160 12L174 28ZM176 28L200 16L204 36ZM124 44L106 38L120 58Z" fill={p.hair} />
        <path d="M123 96L119 118L130 106ZM197 96L201 118L190 106Z" fill={p.hair} />

        {/* brows */}
        <path d="M133 90Q144 84 155 89M165 89Q176 84 187 90" stroke={p.hair} strokeWidth="3.6" strokeLinecap="round" fill="none" />

        {/* eyes (glance) */}
        <ellipse cx="144" cy="103" rx="9.4" ry="7" fill="#fff" />
        <ellipse cx="176" cy="103" rx="9.4" ry="7" fill="#fff" />
        <g className={animated ? 'fm-pupils' : undefined}>
          <circle cx="144" cy="103.4" r="5.2" fill={p.iris} /><circle cx="144" cy="103.4" r="2.5" fill="#150a06" /><circle cx="146.2" cy="101.2" r="1.3" fill="#fff" />
          <circle cx="176" cy="103.4" r="5.2" fill={p.iris} /><circle cx="176" cy="103.4" r="2.5" fill="#150a06" /><circle cx="178.2" cy="101.2" r="1.3" fill="#fff" />
        </g>
        <path d="M134.6 101Q144 95 153.4 101M166.6 101Q176 95 185.4 101" stroke={p.hair} strokeWidth="2" strokeLinecap="round" fill="none" />

        {p.glasses && (
          <g fill="rgba(255,255,255,0.16)" stroke={p.frame} strokeWidth="3.6" strokeLinejoin="round">
            <rect x="130" y="92" width="28" height="22" rx="8" />
            <rect x="162" y="92" width="28" height="22" rx="8" />
            <path d="M158 100Q160 98 162 100M130 98L124 96M190 98L196 96" fill="none" strokeLinecap="round" />
          </g>
        )}

        {/* nose and a small, calm smile */}
        <path d="M158 112Q155 123 158.5 126Q162 128 165 125" stroke={p.shade} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M149 141Q160 148 171 141" stroke="#b9605a" strokeWidth="2.8" strokeLinecap="round" fill="none" />
        <path d="M153 147Q160 150 167 147" stroke={p.shade} strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.7" />
      </g>
    </g>
  );
}
