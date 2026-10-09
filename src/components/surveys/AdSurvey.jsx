import { Send } from 'lucide-react';
import ChoiceGroup from '../forms/ChoiceGroup';
import RatingScale from '../forms/RatingScale';
import Field from '../forms/Field';
import SubmitNotice from '../forms/SubmitNotice';
import { useSurvey } from './useSurvey';

const NOTICED = ['Yes', 'No', 'Not sure'];
const PLACEMENT = ['No ads/promotional content', 'Homepage', 'Product/feature pages', 'Footer', 'No preference'];
const CONTENT = [
  'Educational resources', 'Product updates', 'Related education technology resources',
  'Clearly labeled sponsored content', 'None', 'Other',
];

const INITIAL = { noticed: '', placement: '', relevance: 0, acceptability: 0, content: [], trustworthy: '' };
const REQUIRED = {
  noticed: 'Choose Yes, No or Not sure.',
  placement: 'Choose a placement preference.',
  relevance: 'Rate the relevance you would expect.',
  acceptability: 'Rate how acceptable this would be.',
  content: 'Select at least one option.',
};

export default function AdSurvey() {
  const s = useSurvey({ survey: 'advertising-preferences', initial: INITIAL, required: REQUIRED });
  const { values: v, errors: e } = s;

  return (
    <form ref={s.formRef} className="card form-card" onSubmit={s.onSubmit} noValidate aria-labelledby="ad-title">
      <h2 id="ad-title" className="form-title">Advertising Preferences Survey</h2>
      <p className="form-intro">
        We are gathering preferences about promotional content on this marketing website. This survey does not
        involve any ad network, and answers are not used for targeting. Promotional content will never appear
        during active exams or inside the exam application. Please do not include personal or sensitive information.
      </p>

      <ChoiceGroup id="ad-noticed" legend="Did you notice promotional or advertising content on this website?" required
        options={NOTICED} value={v.noticed} onChange={s.set('noticed')} error={e.noticed} />
      <ChoiceGroup id="ad-placement" legend="Where, if anywhere, would you prefer relevant promotional content?" required
        options={PLACEMENT} value={v.placement} onChange={s.set('placement')} error={e.placement} />
      <RatingScale id="ad-relevance" legend="How relevant would you expect clearly labeled promotional content to be?" required
        low="Not relevant" high="Very relevant" value={v.relevance} onChange={s.set('relevance')} error={e.relevance} />
      <RatingScale id="ad-accept" legend="How acceptable is a clearly labeled, non-intrusive promotional section on this website?" required
        low="Not acceptable" high="Fully acceptable" value={v.acceptability} onChange={s.set('acceptability')} error={e.acceptability} />
      <ChoiceGroup id="ad-content" legend="Which kinds of content would be useful?" required type="checkbox"
        hint="Select all that apply. Choosing None clears the other options." exclusive="None"
        options={CONTENT} value={v.content} onChange={s.set('content')} error={e.content} />
      <Field id="ad-trust" label="What would make promotional content feel trustworthy and non-intrusive?" as="textarea" rows={3} maxLength={1500}
        value={v.trustworthy} onChange={s.setText('trustworthy')} />

      <button type="submit" className="btn btn-primary" disabled={s.busy}>
        <Send size={18} aria-hidden="true" />
        {s.busy ? 'Sending...' : 'Submit survey'}
      </button>
      <SubmitNotice result={s.result} onReset={s.reset} resetLabel="Fill in again" kind="survey" />
    </form>
  );
}
