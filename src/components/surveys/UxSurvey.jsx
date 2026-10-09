import { Send } from 'lucide-react';
import ChoiceGroup from '../forms/ChoiceGroup';
import RatingScale from '../forms/RatingScale';
import Field from '../forms/Field';
import SubmitNotice from '../forms/SubmitNotice';
import { useSurvey } from './useSurvey';

const ROLES = ['Lecturer', 'Administrator', 'IT Staff', 'Student', 'Prospective customer', 'Other', 'Prefer not to say'];
const LOOKING_FOR = ['Product information', 'Features', 'Security/privacy information', 'Demo/contact information', 'Other'];

const INITIAL = { role: '', lookingFor: [], findEase: 0, clarity: 0, trust: 0, confusing: '', improve: '', overall: 0 };
const REQUIRED = {
  role: 'Choose the option that best describes you.',
  lookingFor: 'Select at least one option.',
  findEase: 'Rate how easy it was to find information.',
  clarity: 'Rate how clear the product information was.',
  trust: 'Rate how professional and trustworthy the site felt.',
  overall: 'Rate your overall experience.',
};

export default function UxSurvey() {
  const s = useSurvey({ survey: 'website-ux', initial: INITIAL, required: REQUIRED });
  const { values: v, errors: e } = s;

  return (
    <form ref={s.formRef} className="card form-card" onSubmit={s.onSubmit} noValidate aria-labelledby="ux-title">
      <h2 id="ux-title" className="form-title">Website UX Survey</h2>
      <p className="form-intro">
        Help us understand how easy and trustworthy this website is to use. It takes about two minutes.
        Using the lecturer panel? Try the Lecturer Panel Survey. Please do not include personal or sensitive
        information in your answers.
      </p>

      <ChoiceGroup id="ux-role" legend="Which best describes you?" required options={ROLES}
        value={v.role} onChange={s.set('role')} error={e.role} />
      <ChoiceGroup id="ux-looking" legend="What were you looking for on this website?" required type="checkbox"
        hint="Select all that apply." options={LOOKING_FOR} value={v.lookingFor} onChange={s.set('lookingFor')} error={e.lookingFor} />
      <RatingScale id="ux-find" legend="How easy was it to find the information you needed?" required
        low="Very difficult" high="Very easy" value={v.findEase} onChange={s.set('findEase')} error={e.findEase} />
      <RatingScale id="ux-clarity" legend="How clear was the product information?" required
        low="Very unclear" high="Very clear" value={v.clarity} onChange={s.set('clarity')} error={e.clarity} />
      <RatingScale id="ux-trust" legend="How professional and trustworthy did the website feel?" required
        low="Not at all" high="Extremely" value={v.trust} onChange={s.set('trust')} error={e.trust} />
      <Field id="ux-confusing" label="Was anything confusing or difficult to find?" as="textarea" rows={3} maxLength={1500}
        value={v.confusing} onChange={s.setText('confusing')} />
      <Field id="ux-improve" label="What would you improve?" as="textarea" rows={3} maxLength={1500}
        value={v.improve} onChange={s.setText('improve')} />
      <RatingScale id="ux-overall" legend="Overall, how would you rate your experience?" required
        low="Very poor" high="Excellent" value={v.overall} onChange={s.set('overall')} error={e.overall} />

      <button type="submit" className="btn btn-primary" disabled={s.busy}>
        <Send size={18} aria-hidden="true" />
        {s.busy ? 'Sending...' : 'Submit survey'}
      </button>
      <SubmitNotice result={s.result} onReset={s.reset} resetLabel="Fill in again" kind="survey" />
    </form>
  );
}
