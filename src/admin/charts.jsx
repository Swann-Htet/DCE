// Small dependency-free charts. Each has a text alternative (aria-label / visually hidden table).

const PALETTE = ['#7a1a1a', '#c13a3a', '#e08c88', '#efc9c5', '#3a0a0a'];

// Horizontal bars. Used for rating averages (max 5) and choice counts.
export function HBars({ items, max, format = (v) => String(v), label }) {
  const top = max ?? Math.max(1, ...items.map((i) => i.value));
  return (
    <ul className="hbars" aria-label={label}>
      {items.map((it) => (
        <li key={it.name}>
          <div className="hbar-head"><span>{it.name}</span><strong>{format(it.value)}</strong></div>
          <div className="hbar-track" role="presentation"><span style={{ width: `${Math.min(100, (it.value / top) * 100)}%` }} /></div>
          {it.note && <small>{it.note}</small>}
        </li>
      ))}
    </ul>
  );
}

// Distribution of 1..5 ratings as five columns.
export function Distribution({ dist, label }) {
  const max = Math.max(1, ...dist);
  return (
    <svg viewBox="0 0 150 70" className="dist" role="img" aria-label={`${label}: ${dist.map((c, i) => `${i + 1} star ${c}`).join(', ')}`}>
      {dist.map((c, i) => {
        const h = (c / max) * 46;
        return (
          <g key={i}>
            <rect x={6 + i * 29} y={50 - h} width="22" height={Math.max(h, 1)} rx="4" fill={c ? PALETTE[0] : '#eadcdb'} opacity={0.35 + 0.65 * (c / max)} />
            {c > 0 && <text x={17 + i * 29} y={46 - h} textAnchor="middle" fontSize="9" fontWeight="700" fill="#5a1010">{c}</text>}
            <text x={17 + i * 29} y="64" textAnchor="middle" fontSize="9" fill="#65565a">{i + 1}</text>
          </g>
        );
      })}
    </svg>
  );
}

// Area/line chart for responses per day.
export function LineChart({ points, label }) {
  const W = 560; const H = 160; const pad = { l: 28, r: 8, t: 10, b: 22 };
  const max = Math.max(1, ...points.map((p) => p.count));
  const x = (i) => pad.l + (i / Math.max(1, points.length - 1)) * (W - pad.l - pad.r);
  const y = (v) => pad.t + (1 - v / max) * (H - pad.t - pad.b);
  const line = points.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(p.count).toFixed(1)}`).join(' ');
  const area = `${line} L${x(points.length - 1)},${H - pad.b} L${x(0)},${H - pad.b} Z`;
  const total = points.reduce((a, p) => a + p.count, 0);
  return (
    <>
      <svg viewBox={`0 0 ${W} ${H}`} className="linechart" role="img" aria-label={`${label}: ${total} responses in the last ${points.length} days`}>
        {[0, 0.5, 1].map((t) => (
          <g key={t}>
            <line x1={pad.l} x2={W - pad.r} y1={y(max * t)} y2={y(max * t)} stroke="#eadcdb" />
            <text x={pad.l - 6} y={y(max * t) + 3} textAnchor="end" fontSize="9" fill="#65565a">{Math.round(max * t)}</text>
          </g>
        ))}
        <path d={area} fill="#c13a3a" opacity="0.15" />
        <path d={line} fill="none" stroke="#7a1a1a" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        {points.map((p, i) => p.count > 0 && <circle key={p.date} cx={x(i)} cy={y(p.count)} r="3.5" fill="#7a1a1a"><title>{`${p.date}: ${p.count}`}</title></circle>)}
        <text x={pad.l} y={H - 5} fontSize="9" fill="#65565a">{points[0]?.date}</text>
        <text x={W - pad.r} y={H - 5} fontSize="9" textAnchor="end" fill="#65565a">{points[points.length - 1]?.date}</text>
      </svg>
    </>
  );
}

// Donut with legend. slices: [{name, value}]
export function Donut({ slices, label }) {
  const total = slices.reduce((a, s) => a + s.value, 0);
  const R = 52; const C = 2 * Math.PI * R;
  let offset = 0;
  return (
    <div className="donut-wrap">
      <svg viewBox="0 0 140 140" className="donut" role="img" aria-label={`${label}: ${slices.map((s) => `${s.name} ${s.value}`).join(', ')}`}>
        <circle cx="70" cy="70" r={R} fill="none" stroke="#f6e3e1" strokeWidth="20" />
        {total > 0 && slices.map((s, i) => {
          const len = (s.value / total) * C;
          const el = <circle key={s.name} cx="70" cy="70" r={R} fill="none" stroke={PALETTE[i % PALETTE.length]} strokeWidth="20"
            strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-offset} transform="rotate(-90 70 70)" />;
          offset += len;
          return el;
        })}
        <text x="70" y="68" textAnchor="middle" fontSize="24" fontWeight="800" fill="#1d1212">{total}</text>
        <text x="70" y="84" textAnchor="middle" fontSize="9" fill="#65565a">responses</text>
      </svg>
      <ul className="legend">
        {slices.map((s, i) => <li key={s.name}><i style={{ background: PALETTE[i % PALETTE.length] }} />{s.name}<strong>{s.value}</strong></li>)}
      </ul>
    </div>
  );
}
