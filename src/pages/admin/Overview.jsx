import { Donut, LineChart } from '../../admin/charts';
import { SURVEYS, overallAverage, perDay } from '../../admin/stats';

export default function Overview({ surveys, demos, loaded }) {
  if (!loaded) return <p role="status">Loading data...</p>;
  const bySurvey = Object.entries(SURVEYS).map(([id, name]) => ({ name, value: surveys.filter((s) => s.survey === id).length }));
  const avg = overallAverage(surveys);
  const last7 = perDay([...surveys, ...demos], 7).reduce((a, p) => a + p.count, 0);

  return (
    <>
      <h1 className="admin-title">Overview</h1>
      <div className="stat-grid">
        <div className="stat"><span>Survey responses</span><strong>{surveys.length}</strong></div>
        <div className="stat"><span>Demo requests</span><strong>{demos.length}</strong></div>
        <div className="stat"><span>Average overall rating</span><strong>{avg ? avg.toFixed(2) : '-'}<small> / 5</small></strong></div>
        <div className="stat"><span>Activity, last 7 days</span><strong>{last7}</strong></div>
      </div>
      <div className="admin-two">
        <section className="card admin-panel" aria-labelledby="ov-time">
          <h2 id="ov-time" className="panel-h">Survey responses, last 30 days</h2>
          <LineChart points={perDay(surveys, 30)} label="Survey responses per day" />
        </section>
        <section className="card admin-panel" aria-labelledby="ov-split">
          <h2 id="ov-split" className="panel-h">Responses by survey</h2>
          <Donut slices={bySurvey} label="Responses by survey" />
        </section>
      </div>
      <p className="admin-note">Averages use the overall rating (website UX) and overall satisfaction (lecturer panel). Skipped ratings are ignored.</p>
    </>
  );
}
