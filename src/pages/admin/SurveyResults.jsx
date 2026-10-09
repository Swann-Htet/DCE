import { useMemo, useState } from 'react';
import { Distribution, HBars } from '../../admin/charts';
import { SURVEYS, summarize } from '../../admin/stats';

export default function SurveyResults({ surveys }) {
  const [survey, setSurvey] = useState('website-ux');
  const rows = useMemo(() => surveys.filter((s) => s.survey === survey), [surveys, survey]);
  const { ratings, choices, texts } = useMemo(() => summarize(rows), [rows]);

  return (
    <>
      <h1 className="admin-title">Survey results</h1>
      <div className="seg" role="group" aria-label="Choose survey">
        {Object.entries(SURVEYS).map(([id, name]) => (
          <button key={id} type="button" aria-pressed={survey === id} onClick={() => setSurvey(id)}>
            {name} <span className="seg-count">{surveys.filter((s) => s.survey === id).length}</span>
          </button>
        ))}
      </div>

      {rows.length === 0 ? (
        <p className="admin-empty">No responses for this survey yet.</p>
      ) : (
        <>
          {ratings.length > 0 && (
            <section className="card admin-panel" aria-labelledby="rt-avg">
              <h2 id="rt-avg" className="panel-h">Average rating (1 to 5)</h2>
              <HBars label="Average rating per question" max={5} format={(v) => v.toFixed(2)}
                items={ratings.map((r) => ({ name: r.label, value: r.avg, note: `${r.n} answer${r.n === 1 ? '' : 's'}` }))} />
            </section>
          )}
          {ratings.length > 0 && (
            <section className="card admin-panel" aria-labelledby="rt-dist">
              <h2 id="rt-dist" className="panel-h">How ratings were spread</h2>
              <div className="dist-grid">
                {ratings.map((r) => (
                  <figure key={r.key} className="dist-item">
                    <figcaption>{r.label}</figcaption>
                    <Distribution dist={r.dist} label={r.label} />
                  </figure>
                ))}
              </div>
            </section>
          )}
          {choices.length > 0 && (
            <div className="admin-two">
              {choices.map((c) => (
                <section key={c.key} className="card admin-panel" aria-label={c.label}>
                  <h2 className="panel-h">{c.label}</h2>
                  <HBars label={c.label} max={c.n}
                    format={(v) => `${v} (${Math.round((v / c.n) * 100)}%)`}
                    items={c.options.map((o) => ({ name: o.name, value: o.count }))} />
                </section>
              ))}
            </div>
          )}
          {texts.length > 0 && (
            <section className="card admin-panel" aria-labelledby="rt-text">
              <h2 id="rt-text" className="panel-h">Written comments</h2>
              {texts.map((t) => (
                <div key={t.key} className="comments">
                  <h3>{t.label}</h3>
                  <ul>
                    {t.items.map((i, idx) => <li key={idx}><span>{new Date(i.at).toLocaleDateString()}</span>{i.text}</li>)}
                  </ul>
                </div>
              ))}
            </section>
          )}
        </>
      )}
    </>
  );
}
