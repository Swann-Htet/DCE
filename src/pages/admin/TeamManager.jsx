import { useCallback, useEffect, useState } from 'react';
import { ImagePlus, Pencil, Plus, Save, Trash2, X } from 'lucide-react';
import Field from '../../components/forms/Field';
import { PHOTO_BUCKET, photoUrl, supabase } from '../../lib/supabase';

const EMPTY = { id: null, kind: 'student', name: '', role: '', bio: '', sort_order: 0, photo_path: null };
const TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_BYTES = 2 * 1024 * 1024;

export default function TeamManager() {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState(null); // null = closed
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const { data, error: err } = await supabase.from('team_members').select('*').order('sort_order').order('created_at');
    if (err) setError(err.message); else { setError(''); setMembers(data); }
  }, []);
  useEffect(() => { load(); }, [load]);
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  const open = (m) => { setForm(m ? { ...m, role: m.role || '', bio: m.bio || '' } : { ...EMPTY, sort_order: members.length + 1 }); setFile(null); setPreview(null); setError(''); };
  const close = () => { setForm(null); setFile(null); setPreview(null); };
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: k === 'sort_order' ? Number(e.target.value) : e.target.value }));

  const pick = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!TYPES.includes(f.type)) { setError('Photo must be a JPG, PNG or WebP image.'); e.target.value = ''; return; }
    if (f.size > MAX_BYTES) { setError('Photo must be 2 MB or smaller.'); e.target.value = ''; return; }
    setError('');
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const save = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { setError('Name is required.'); return; }
    setBusy(true);
    setError('');
    let photo_path = form.photo_path;
    const oldPath = form.photo_path;

    if (file) {
      const ext = file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'jpg';
      const path = `${crypto.randomUUID()}.${ext}`;
      const up = await supabase.storage.from(PHOTO_BUCKET).upload(path, file, { contentType: file.type, cacheControl: '3600' });
      if (up.error) { setBusy(false); setError(`Photo upload failed: ${up.error.message}`); return; }
      photo_path = path;
    }

    const row = { kind: form.kind, name: form.name.trim(), role: form.role.trim() || null, bio: form.bio.trim() || null, sort_order: form.sort_order || 0, photo_path };
    const res = form.id ? await supabase.from('team_members').update(row).eq('id', form.id) : await supabase.from('team_members').insert(row);
    if (res.error) {
      if (file) await supabase.storage.from(PHOTO_BUCKET).remove([photo_path]); // do not leave an orphan upload
      setBusy(false); setError(res.error.message); return;
    }
    if (file && oldPath) await supabase.storage.from(PHOTO_BUCKET).remove([oldPath]);
    setBusy(false);
    close();
    load();
  };

  const remove = async (m) => {
    if (!window.confirm(`Delete ${m.name}? This also removes their photo.`)) return;
    const { error: err } = await supabase.from('team_members').delete().eq('id', m.id);
    if (err) { setError(err.message); return; }
    if (m.photo_path) await supabase.storage.from(PHOTO_BUCKET).remove([m.photo_path]);
    load();
  };

  const removePhoto = async () => {
    if (!form.photo_path || !form.id) { setFile(null); setPreview(null); return; }
    if (!window.confirm('Remove this photo?')) return;
    const { error: err } = await supabase.from('team_members').update({ photo_path: null }).eq('id', form.id);
    if (err) { setError(err.message); return; }
    await supabase.storage.from(PHOTO_BUCKET).remove([form.photo_path]);
    setForm((f) => ({ ...f, photo_path: null }));
    load();
  };

  const shown = preview || photoUrl(form?.photo_path);

  return (
    <>
      <div className="admin-head">
        <h1 className="admin-title">Team &amp; advisor</h1>
        {!form && <button type="button" className="btn btn-sm btn-primary" onClick={() => open(null)}><Plus size={16} aria-hidden="true" /> Add person</button>}
      </div>
      <p className="admin-note">These profiles appear on the public About page. Students are listed in the team grid, advisors in the advisor card.</p>
      {error && <div className="notice notice-error" role="alert"><p>{error}</p></div>}

      {form && (
        <form className="card admin-panel team-form" onSubmit={save} noValidate aria-label={form.id ? 'Edit person' : 'Add person'}>
          <h2 className="panel-h">{form.id ? 'Edit person' : 'Add person'}</h2>
          <div className="team-photo">
            {shown ? <img src={shown} alt={`Photo of ${form.name || 'this person'}`} /> : <span className="avatar" aria-hidden="true">{(form.name || '?').slice(0, 1)}</span>}
            <div>
              <label className="btn btn-sm btn-primary file-btn">
                <ImagePlus size={16} aria-hidden="true" /> {shown ? 'Change photo' : 'Upload photo'}
                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={pick} />
              </label>
              {(shown) && <button type="button" className="btn btn-sm btn-ghost" onClick={removePhoto}>Remove photo</button>}
              <p className="hint">JPG, PNG or WebP, up to 2 MB. A square photo works best.</p>
            </div>
          </div>
          <div className="form-grid">
            <Field id="tm-name" label="Name" required maxLength={120} value={form.name} onChange={set('name')} />
            <Field id="tm-kind" label="Type" as="select" value={form.kind} onChange={set('kind')}>
              <option value="student">Student (team member)</option>
              <option value="advisor">Lecturer / advisor</option>
            </Field>
            <Field id="tm-role" label="Role / title" maxLength={120} value={form.role} onChange={set('role')} />
            <Field id="tm-order" label="Display order (smaller first)" type="number" value={form.sort_order} onChange={set('sort_order')} />
          </div>
          <Field id="tm-bio" label="Short bio" as="textarea" rows={3} maxLength={600} value={form.bio} onChange={set('bio')} />
          <div className="btn-row-tight">
            <button type="submit" className="btn btn-primary" disabled={busy}><Save size={16} aria-hidden="true" /> {busy ? 'Saving...' : 'Save'}</button>
            <button type="button" className="btn btn-ghost" onClick={close}><X size={16} aria-hidden="true" /> Cancel</button>
          </div>
        </form>
      )}

      <ul className="team-list plain">
        {members.map((m) => (
          <li key={m.id} className="card team-row">
            {m.photo_path ? <img src={photoUrl(m.photo_path)} alt={`Photo of ${m.name}`} /> : <span className="avatar" aria-hidden="true">{m.name.slice(0, 1)}</span>}
            <div className="team-info">
              <strong>{m.name}</strong>
              <span>{m.role || 'No role set'}</span>
              <small className="pill">{m.kind === 'advisor' ? 'Advisor' : 'Student'}</small>
            </div>
            <div className="team-actions">
              <button type="button" className="icon-btn" aria-label={`Edit ${m.name}`} onClick={() => open(m)}><Pencil size={16} /></button>
              <button type="button" className="icon-btn danger" aria-label={`Delete ${m.name}`} onClick={() => remove(m)}><Trash2 size={16} /></button>
            </div>
          </li>
        ))}
        {members.length === 0 && <li className="admin-empty">No profiles yet. Run supabase/admin.sql to seed them, or add one above.</li>}
      </ul>
    </>
  );
}
