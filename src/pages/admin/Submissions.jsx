import { useState } from 'react';
import { Download, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { SURVEYS, demoCsv, download, surveyCsv } from '../../admin/stats';

const fmt = (iso) => new Date(iso).toLocaleString();

export default function Submissions({ surveys, demos, reload }) {
  const [view, setView] = useState('demos');
  const [error, setError] = useState('');

  const remove = async (table, id) => {
    if (!window.confirm('Delete this submission permanently?')) return;
    const { error: err } = await supabase.from(table).delete().eq('id', id);
    if (err) setError(err.message); else { setError(''); reload(); }
  };

  return (
    <>
      <h1 className="admin-title">Submissions</h1>
      <div className="seg" role="group" aria-label="Choose list">
        <button type="button" aria-pressed={view === 'demos'} onClick={() => setView('demos')}>Demo requests <span className="seg-count">{demos.length}</span></button>
        <button type="button" aria-pressed={view === 'surveys'} onClick={() => setView('surveys')}>Survey responses <span className="seg-count">{surveys.length}</span></button>
      </div>
      {error && <div className="notice notice-error" role="alert"><p>{error}</p></div>}

      <div className="admin-actions">
        <button type="button" className="btn btn-sm btn-primary"
          onClick={() => download(view === 'demos' ? 'demo-requests.csv' : 'survey-responses.csv', view === 'demos' ? demoCsv(demos) : surveyCsv(surveys))}>
          <Download size={15} aria-hidden="true" /> Export CSV
        </button>
      </div>

      <div className="table-wrap card">
        {view === 'demos' ? (
          <table>
            <thead><tr><th>Received</th><th>Name</th><th>Email</th><th>Institution</th><th>Role</th><th>Interest</th><th><span className="sr-only">Actions</span></th></tr></thead>
            <tbody>
              {demos.length === 0 && <tr><td colSpan="7" className="admin-empty">No demo requests yet.</td></tr>}
              {demos.map((d) => (
                <tr key={d.id}>
                  <td>{fmt(d.created_at)}</td><td>{d.name}</td><td><a href={`mailto:${d.email}`}>{d.email}</a></td>
                  <td>{d.institution}</td><td>{d.role}</td><td className="wrap">{d.interest}</td>
                  <td><button type="button" className="icon-btn" aria-label={`Delete request from ${d.name}`} onClick={() => remove('demo_requests', d.id)}><Trash2 size={16} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table>
            <thead><tr><th>Received</th><th>Survey</th><th>Answers</th><th><span className="sr-only">Actions</span></th></tr></thead>
            <tbody>
              {surveys.length === 0 && <tr><td colSpan="4" className="admin-empty">No survey responses yet.</td></tr>}
              {surveys.map((s) => (
                <tr key={s.id}>
                  <td>{fmt(s.created_at)}</td><td>{SURVEYS[s.survey] || s.survey}</td>
                  <td className="wrap"><details><summary>{Object.keys(s.answers || {}).length} fields</summary><pre>{JSON.stringify(s.answers, null, 2)}</pre></details></td>
                  <td><button type="button" className="icon-btn" aria-label="Delete this survey response" onClick={() => remove('survey_responses', s.id)}><Trash2 size={16} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
