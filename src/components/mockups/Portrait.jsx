// Flat avatar portrait (bold hair, simple face, optional glasses, hoodie). Drawn in a 320x240 box with the head
// centred at x=160. `animated` adds the hooks used by the face-signal loop:
//   .fm-head   the head, pivoting from the base of the neck so the two always stay joined
//   .fm-pupils the eyes, which can glance left and right
export const PALETTES = {
  main: { skin: '#f2a066', shade: '#c9684a', hair: '#070707', hood: '#b6b6b6', jacket: '#07140a', inner: '#14420f', frame: '#2a1410', glasses: true },
  other: { skin: '#e8b48c', shade: '#bf8663', hair: '#6b3b1f', hood: '#a02a2a', jacket: '#3a0a0a', inner: '#f2e6e2', frame: '#222', glasses: false },
  c: { skin: '#f6c9a6', shade: '#d49a78', hair: '#d3a24a', hood: '#7b8fa5', jacket: '#1f2a38', inner: '#e5edf5', frame: '#7a1a1a', glasses: true },
  d: { skin: '#a87049', shade: '#835230', hair: '#0c0806', hood: '#6b4c8a', jacket: '#25153a', inner: '#e9dff5', frame: '#222', glasses: false },
  e: { skin: '#f0b999', shade: '#c98a6b', hair: '#8a3b1f', hood: '#2f7a6f', jacket: '#10312c', inner: '#f3f0e6', frame: '#222', glasses: true },
  f: { skin: '#8a5a3a', shade: '#6a4029', hair: '#0a0a0a', hood: '#c9c9c9', jacket: '#16202c', inner: '#9a2323', frame: '#222', glasses: false },
};

export default function Portrait({ p = PALETTES.main, animated = false }) {
  return (
    <g>
      {/* hoodie: jacket, hood collar, inner shirt */}
      <path d="M40 300C42 232 92 192 142 188L160 212L178 188C228 192 278 232 280 300Z" fill={p.jacket} />
      <path d="M78 214C96 194 124 186 146 188L160 214L174 188C196 186 224 194 242 214C226 204 204 202 184 208L160 236L136 208C116 202 94 204 78 214Z" fill={p.hood} />
      <path d="M146 192L160 220L174 192Z" fill={p.inner} />
      <path d="M130 218L128 240M190 218L192 240" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.85" />

      {/* neck: runs up behind the head so a moving head never leaves a gap */}
      <path d="M143 120H177V184C172 196 148 196 143 184Z" fill={p.skin} />
      <ellipse cx="160" cy="170" rx="22" ry="11" fill={p.shade} />

      <g className={animated ? 'fm-head' : undefined}>
        {/* ears */}
        <ellipse cx="120" cy="108" rx="9" ry="14" fill={p.skin} />
        <ellipse cx="200" cy="108" rx="9" ry="14" fill={p.skin} />
        <ellipse cx="121" cy="109" rx="4" ry="8" fill={p.shade} opacity="0.55" />
        <ellipse cx="199" cy="109" rx="4" ry="8" fill={p.shade} opacity="0.55" />

        {/* face */}
        <path d="M120 88C120 66 138 54 160 54C182 54 200 66 200 88V116C200 144 184 166 160 170C136 166 120 144 120 116Z" fill={p.skin} />

        {/* hair: messy cap, fringe strands, side spikes */}
        <path d="M114 118C104 62 128 30 164 30C204 30 218 64 208 118C206 100 202 88 194 78C172 90 142 86 126 74C120 86 118 102 114 118Z" fill={p.hair} />
        <path d="M128 70C150 86 176 86 194 76L198 90C178 98 150 96 132 84Z" fill={p.hair} />
        <path d="M140 84L156 106L150 88ZM160 88L176 108L170 90Z" fill={p.skin} />
        <path d="M118 112L112 136L126 122ZM202 112L208 136L194 122Z" fill={p.hair} />
        <path d="M146 34L174 20L190 34ZM176 32L206 28L198 42Z" fill={p.hair} />

        {/* eyes (glance) */}
        <g className={animated ? 'fm-pupils' : undefined}>
          <ellipse cx="143" cy="104" rx="3" ry="3.6" fill="#1a0f0c" />
          <ellipse cx="177" cy="104" rx="3" ry="3.6" fill="#1a0f0c" />
        </g>

        {/* glasses */}
        {p.glasses && (
          <g fill="rgba(255,255,255,0.22)" stroke={p.frame} strokeWidth="4" strokeLinejoin="round">
            <rect x="126" y="93" width="34" height="22" rx="8" />
            <rect x="160" y="93" width="34" height="22" rx="8" />
            <path d="M160 100H160" fill="none" />
            <path d="M126 99L119 96M194 99L201 96" fill="none" strokeLinecap="round" />
          </g>
        )}

        {/* nose and mouth: kept minimal */}
        <path d="M160 112Q156 126 161 129" stroke={p.shade} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M150 143Q160 150 170 143" stroke={p.shade} strokeWidth="3" strokeLinecap="round" fill="none" />
      </g>
    </g>
  );
}
