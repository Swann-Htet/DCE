import { Send } from 'lucide-react';
import ChoiceGroup from '../forms/ChoiceGroup';
import RatingScale from '../forms/RatingScale';
import Field from '../forms/Field';
import SubmitNotice from '../forms/SubmitNotice';
import { useSurvey } from './useSurvey';

const USED = ['Yes', 'No'];
const FREQUENCY = ['This was my first time', 'A few times', 'Regularly'];
const EASY = { low: 'Very difficult', high: 'Very easy' };
const EXP = { low: 'Very poor', high: 'Excellent' };
const CLEAR = { low: 'Very unclear', high: 'Very clear' };
const USEFUL = { low: 'Not useful', high: 'Very useful' };

// One entry per area of the lecturer panel. Ratings are optional so lecturers can skip areas they have not used.
const SECTIONS = [
  { title: 'Courses', items: [
    { id: 'coursesEase', q: 'How easy was it to create and manage your courses?', ...EASY },
  ] },
  { title: 'Question bank', items: [
    { id: 'qbExperience', q: 'How was your overall experience adding questions to the question bank?', ...EXP },
    { id: 'qbTypes', q: 'How easy was it to choose and set up question types (true/false, single choice, multiple choice, sorting)?', ...EASY },
    { id: 'qbEdit', q: 'How easy was it to find, edit or delete existing questions?', ...EASY },
    { id: 'qbImport', q: 'How was your experience importing questions with the import wizard?', ...EXP },
  ] },
  { title: 'Exam settings', items: [
    { id: 'setTiming', q: 'How clear was it to set the duration and the start/end window?', ...CLEAR },
    { id: 'setLimits', q: 'How clear were the tab-switch, cursor-boundary and camera warning settings?', ...CLEAR },
    { id: 'setPublish', q: 'How confident did you feel when publishing an exam?', low: 'Not confident', high: 'Very confident' },
  ] },
  { title: 'Student access', items: [
    { id: 'accImport', q: 'How easy was it to add or import your student list?', ...EASY },
    { id: 'accQr', q: 'How useful were the QR codes for student check-in?', ...USEFUL },
  ] },
  { title: 'Results and monitoring', items: [
    { id: 'resFind', q: 'How easy was it to find a specific student or course in the results?', ...EASY },
    { id: 'resExport', q: 'How useful was the CSV export?', ...USEFUL },
    { id: 'resSignals', q: 'How clear were the warning counts (tab switches, cursor, camera) for reviewing an attempt?', ...CLEAR },
    { id: 'monitorUseful', q: 'How useful was the monitoring page during or after an exam?', ...USEFUL },
  ] },
  { title: 'The panel overall', items: [
    { id: 'navEase', q: 'How easy was it to move around the lecturer panel and find what you needed?', ...EASY },
    { id: 'layout', q: 'How clear and uncluttered did the layout feel?', ...CLEAR },
    { id: 'speed', q: 'How fast and responsive did the panel feel?', low: 'Very slow', high: 'Very fast' },
    { id: 'confidence', q: 'How confident are you using these signals as input to your own review, rather than as proof?', low: 'Not confident', high: 'Very confident' },
  ] },
];

const TASKS = [
  'Creating courses', 'Adding questions one by one', 'Importing questions', 'Configuring exam settings',
  'Managing student access', 'Finding results', 'Understanding warning counts', 'None, everything was straightforward',
];
const WISHES = [
  'Bulk edit questions', 'Question categories or tags', 'Exam templates', 'Richer result filters', 'More export formats',
  'Clearer on-screen guidance', 'Other',
];

const RATING_IDS = SECTIONS.flatMap((s) => s.items.map((i) => i.id));
const INITIAL = {
  usedPanel: '', frequency: '',
  ...Object.fromEntries(RATING_IDS.map((id) => [id, 0])),
  satisfaction: 0, slowTasks: [], wishes: [], frustration: '', suggestions: '',
};

const REQUIRED = (v) => ({
  usedPanel: 'Tell us whether you have used the lecturer panel.',
  ...(v.usedPanel === 'Yes' && {
    frequency: 'Choose how often you have used it.',
    satisfaction: 'Rate your overall satisfaction.',
  }),
});

export default function LecturerSurvey() {
  const s = useSurvey({ survey: 'lecturer-panel', initial: INITIAL, required: REQUIRED });
  const { values: v, errors: e } = s;
  const used = v.usedPanel === 'Yes';

  return (
    <form ref={s.formRef} className="card form-card" onSubmit={s.onSubmit} noValidate aria-labelledby="lec-title">
      <h2 id="lec-title" className="form-title">Lecturer Panel Survey</h2>
      <p className="form-intro">
        Tell us about your experience with the DCE lecturer panel, area by area. Rate only the parts you have used:
        every rating is optional except where marked. Please do not include personal or sensitive information.
      </p>

      <ChoiceGroup id="lec-used" legend="Have you used the DCE lecturer panel?" required options={USED}
        value={v.usedPanel} onChange={s.set('usedPanel')} error={e.usedPanel} />

      {used && (
        <>
          <ChoiceGroup id="lec-frequency" legend="How often have you used it?" required options={FREQUENCY}
            value={v.frequency} onChange={s.set('frequency')} error={e.frequency} />

          {SECTIONS.map((sec) => (
            <div key={sec.title} className="survey-block">
              <h3 className="form-section">{sec.title}</h3>
              {sec.items.map((it) => (
                <RatingScale key={it.id} id={`lec-${it.id}`} legend={it.q} low={it.low} high={it.high}
                  value={v[it.id]} onChange={s.set(it.id)} />
              ))}
            </div>
          ))}

          <div className="survey-block">
            <h3 className="form-section">Wrap-up</h3>
            <RatingScale id="lec-satisfaction" legend="Overall, how satisfied are you with the lecturer panel?" required
              low="Very dissatisfied" high="Very satisfied" value={v.satisfaction} onChange={s.set('satisfaction')} error={e.satisfaction} />
            <ChoiceGroup id="lec-slow" legend="Which tasks took longer than expected?" type="checkbox"
              hint="Select all that apply. Choosing the last option clears the others." exclusive="None, everything was straightforward"
              options={TASKS} value={v.slowTasks} onChange={s.set('slowTasks')} />
            <ChoiceGroup id="lec-wishes" legend="Which of these would help you most?" type="checkbox"
              hint="Select all that apply." options={WISHES} value={v.wishes} onChange={s.set('wishes')} />
            <Field id="lec-frustration" label="What was the most frustrating part?" as="textarea" rows={3} maxLength={1500}
              value={v.frustration} onChange={s.setText('frustration')} />
            <Field id="lec-suggestions" label="What should we add or improve in the lecturer panel?" as="textarea" rows={3} maxLength={1500}
              value={v.suggestions} onChange={s.setText('suggestions')} />
          </div>
        </>
      )}

      <button type="submit" className="btn btn-primary" disabled={s.busy}>
        <Send size={18} aria-hidden="true" />
        {s.busy ? 'Sending...' : 'Submit survey'}
      </button>
      <SubmitNotice result={s.result} onReset={s.reset} resetLabel="Fill in again" kind="survey" />
    </form>
  );
}
