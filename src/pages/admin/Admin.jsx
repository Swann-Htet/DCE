import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Inbox, LogOut, MessageSquareText, ShieldCheck, Users } from 'lucide-react';
import { supabase, useAdminSession } from '../../lib/supabase';
import AdminLogin from './AdminLogin';
import Overview from './Overview';
import SurveyResults from './SurveyResults';
import Submissions from './Submissions';
import TeamManager from './TeamManager';

const TABS = [
  { id: 'overview', label: 'Overview', Icon: BarChart3 },
  { id: 'results', label: 'Survey results', Icon: MessageSquareText },
  { id: 'submissions', label: 'Submissions', Icon: Inbox },
  { id: 'team', label: 'Team & advisor', Icon: Users },
];

export default function Admin() {
  const { loading, session, isAdmin } = useAdminSession();
  const [tab, setTab] = useState('overview');
  const [data, setData] = useState({ surveys: [], demos: [], error: '', loaded: false });

  useEffect(() => {
    const meta = Object.assign(document.createElement('meta'), { name: 'robots', content: 'noindex,nofollow' });
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  const load = async () => {
    const [s, d] = await Promise.all([
      supabase.from('survey_responses').select('*').order('created_at', { ascending: false }).limit(2000),
      supabase.from('demo_requests').select('*').order('created_at', { ascending: false }).limit(2000),
    ]);
    setData({ surveys: s.data || [], demos: d.data || [], error: s.error?.message || d.error?.message || '', loaded: true });
  };

  useEffect(() => {
    if (!isAdmin) return;
    load();
  }, [isAdmin]);

  if (!supabase) {
    return (
      <div className="admin-center">
        <div className="card admin-card">
          <h1 className="form-title">Admin panel</h1>
          <p>Supabase is not configured. Set <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> (see README), then restart.</p>
          <Link to="/" className="btn btn-primary">Back to site</Link>
        </div>
      </div>
    );
  }
  if (loading) return <div className="admin-center"><p role="status">Loading...</p></div>;
  if (!session) return <AdminLogin />;
  if (!isAdmin) {
    return (
      <div className="admin-center">
        <div className="card admin-card">
          <h1 className="form-title">No admin access</h1>
          <p>You are signed in as {session.user.email}, but this account is not on the admin list.</p>
          <button type="button" className="btn btn-primary" onClick={() => supabase.auth.signOut()}>Sign out</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin">
      <header className="admin-bar">
        <div className="admin-brand"><span className="brand-mark"><ShieldCheck size={19} aria-hidden="true" /></span> DCE Admin</div>
        <nav aria-label="Admin sections" className="admin-tabs" role="tablist">
          {TABS.map(({ id, label, Icon }) => (
            <button key={id} type="button" role="tab" aria-selected={tab === id} className="admin-tab" onClick={() => setTab(id)}>
              <Icon size={16} aria-hidden="true" /> {label}
            </button>
          ))}
        </nav>
        <div className="admin-user">
          <Link to="/" className="admin-link">View site</Link>
          <button type="button" className="btn btn-sm btn-ghost admin-signout" onClick={() => supabase.auth.signOut()}>
            <LogOut size={15} aria-hidden="true" /> Sign out
          </button>
        </div>
      </header>

      <main className="admin-main" id="main" tabIndex={-1}>
        {data.error && <div className="notice notice-error" role="alert"><p>{data.error}</p></div>}
        {tab === 'overview' && <Overview surveys={data.surveys} demos={data.demos} loaded={data.loaded} />}
        {tab === 'results' && <SurveyResults surveys={data.surveys} />}
        {tab === 'submissions' && <Submissions surveys={data.surveys} demos={data.demos} reload={load} />}
        {tab === 'team' && <TeamManager />}
      </main>
    </div>
  );
}
