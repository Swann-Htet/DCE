import { useId } from 'react';

// Faceted flat-vector portrait (angular light and shadow planes). Drawn around a head centred at (160, 108)
// in a 320x240 box. `animated` adds the hooks used by the face-signal loop (.fm-head, .fm-pupils).
export const PALETTES = {
  main: { skin: '#f0c4a6', light: '#fadfca', shade: '#d99f82', deep: '#bf7f64', hair: '#4f2217', hairHi: '#8c4a33', hairDark: '#26110b', iris: '#3f86b8', shirt: '#26384f', collar: '#1a2a3e' },
  other: { skin: '#e6b490', light: '#f2cdb0', shade: '#cb9070', deep: '#ad7052', hair: '#1e1411', hairHi: '#4a362e', hairDark: '#0f0a08', iris: '#6b4a32', shirt: '#7a1a1a', collar: '#5a1010' },
  c: { skin: '#f6d2ba', light: '#fde8d8', shade: '#e0ad92', deep: '#c98d74', hair: '#c79a4a', hairHi: '#e6c27e', hairDark: '#7a5a22', iris: '#4a8f7a', shirt: '#3d4f3f', collar: '#2c3a2d' },
  d: { skin: '#b9825c', light: '#d29c75', shade: '#9a6644', deep: '#80502f', hair: '#17100d', hairHi: '#3b2a22', hairDark: '#0a0705', iris: '#4a2f1f', shirt: '#5a3b6b', collar: '#42284f' },
  e: { skin: '#edbd9c', light: '#f8d9c0', shade: '#d39877', deep: '#b87a5a', hair: '#7b3a22', hairHi: '#b0623a', hairDark: '#3d1a0e', iris: '#5b7f4f', shirt: '#9a2323', collar: '#7a1a1a' },
  f: { skin: '#8d5a3b', light: '#a97452', shade: '#744629', deep: '#5e3620', hair: '#0e0a08', hairHi: '#2a1d17', hairDark: '#050303', iris: '#3a2418', shirt: '#2f5160', collar: '#1f3b48' },
};

export default function Portrait({ p = PALETTES.main, animated = false }) {
  const uid = useId().replace(/:/g, '');
  const eyeL = 'M134 104Q145 97 157 104Q146 110.5 134 104Z';
  const eyeR = 'M186 104Q175 97 163 104Q174 110.5 186 104Z';
  return (
    <g>
      <defs>
        <clipPath id={`${uid}L`}><path d={eyeL} /></clipPath>
        <clipPath id={`${uid}R`}><path d={eyeR} /></clipPath>
      </defs>
      {/* shoulders, collar and neck */}
      <path d="M44 300C46 226 98 188 160 184C222 188 274 226 276 300Z" fill={p.shirt} />
      <path d="M126 186L160 232L194 186C184 183 172 182 160 182C148 182 136 183 126 186Z" fill={p.collar} />
      <path d="M139 146H181V190C172 206 148 206 139 190Z" fill={p.skin} />
      <path d="M139 146H181V172C170 181 150 179 139 168Z" fill={p.deep} opacity="0.55" />

      <g className={animated ? 'fm-head' : undefined}>
        {/* ears */}
        <path d="M120 98C110 95 108 112 114 124C118 130 123 128 122 120Z" fill={p.skin} />
        <path d="M200 98C210 95 212 112 206 124C202 130 197 128 198 120Z" fill={p.skin} />
        <path d="M116 104C113 110 115 118 118 122" stroke={p.deep} strokeWidth="2" fill="none" opacity="0.6" />
        <path d="M204 104C207 110 205 118 202 122" stroke={p.deep} strokeWidth="2" fill="none" opacity="0.6" />

        {/* head and facial planes */}
        <path d="M117 92C117 66 136 54 160 54C184 54 203 66 203 92V114C203 140 186 160 160 168C134 160 117 140 117 114Z" fill={p.skin} />
        <path d="M117 96H130L138 134L152 160L160 168C134 160 117 140 117 114Z" fill={p.shade} opacity="0.6" />
        <path d="M203 96H192L186 132L170 160L160 168C186 160 203 140 203 114Z" fill={p.light} opacity="0.5" />
        <path d="M142 62L180 62L192 80L150 77Z" fill={p.light} opacity="0.75" />
        <path d="M122 126Q130 152 160 164Q190 152 198 126Q192 150 160 169Q128 150 122 126Z" fill={p.deep} opacity="0.35" />
        {/* nose */}
        <path d="M158 100L153 128L147 131L152 106Z" fill={p.shade} opacity="0.6" />
        <path d="M161 100L165 124L160 129Z" fill={p.light} opacity="0.85" />
        <path d="M148 131Q160 139 172 131Q166 127.5 160 128.5Q154 127.5 148 131Z" fill={p.deep} opacity="0.75" />

        {/* hair */}
        <path d="M113 100C103 58 128 30 164 30C198 30 218 58 207 100C205 82 198 70 184 62C166 66 144 64 128 72C120 78 116 88 113 100Z" fill={p.hair} />
        <path d="M124 56C144 36 184 34 204 56C186 46 150 44 124 56Z" fill={p.hairHi} opacity="0.85" />
        <path d="M138 47C154 40 172 40 188 47C172 44 154 46 138 47Z" fill={p.hairHi} opacity="0.7" />
        <path d="M150 34C150 48 146 58 134 66C140 54 144 44 150 34Z" fill={p.hairDark} />
        <path d="M172 34C176 46 184 56 198 62C190 52 182 44 172 34Z" fill={p.hairDark} />
        <path d="M115 84C114 96 116 106 120 112L124 94Z" fill={p.hair} />
        <path d="M205 84C206 96 204 106 200 112L196 94Z" fill={p.hair} />

        {/* brows */}
        <path d="M133 91Q146 84 158 90L158 94Q146 90 134 97Z" fill={p.hairDark} />
        <path d="M187 91Q174 84 162 90L162 94Q174 90 186 97Z" fill={p.hairDark} />

        {/* eyes */}
        <path d={eyeL} fill="#fff" />
        <path d={eyeR} fill="#fff" />
        <g clipPath={`url(#${uid}L)`}>
          <g className={animated ? 'fm-pupils' : undefined}>
            <circle cx="145.5" cy="104" r="4.6" fill={p.iris} /><circle cx="145.5" cy="104" r="2.1" fill="#111" /><circle cx="147" cy="102.6" r="0.9" fill="#fff" />
          </g>
        </g>
        <g clipPath={`url(#${uid}R)`}>
          <g className={animated ? 'fm-pupils' : undefined}>
            <circle cx="174.5" cy="104" r="4.6" fill={p.iris} /><circle cx="174.5" cy="104" r="2.1" fill="#111" /><circle cx="176" cy="102.6" r="0.9" fill="#fff" />
          </g>
        </g>
        <path d="M134 104Q145 97 157 104M186 104Q175 97 163 104" stroke={p.hairDark} strokeWidth="1.8" strokeLinecap="round" fill="none" />

        {/* mouth */}
        <path d="M148 141Q154 137 160 139Q166 137 172 141Q160 144 148 141Z" fill="#a8554f" />
        <path d="M149 142Q160 150 171 142Q160 156 149 142Z" fill="#cc7f72" />
        <path d="M152 153Q160 157 168 153Q160 159 152 153Z" fill={p.deep} opacity="0.35" />
      </g>
    </g>
  );
}
