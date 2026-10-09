import { CheckCircle2, FlaskConical, TriangleAlert } from 'lucide-react';

// Honest result banner. 'sent' appears only after a real 2xx from a configured endpoint.
export default function SubmitNotice({ result, onReset, resetLabel = 'Start over', kind = 'request' }) {
  if (!result) return null;
  const view = {
    sent: {
      cls: 'notice-success', Icon: CheckCircle2, title: 'Thank you, your response was sent.',
      body: kind === 'request' ? 'We will use the details you provided to follow up on your demo request.' : 'Your feedback has been delivered.',
    },
    'not-configured': {
      cls: 'notice-info', Icon: FlaskConical, title: 'Prototype mode: nothing was sent.',
      body: 'Your answers passed validation, but this site is not connected to a form backend yet, so they were not saved or delivered. Set the form endpoint in the site configuration to enable delivery.',
    },
    failed: {
      cls: 'notice-error', Icon: TriangleAlert, title: 'We could not send this.',
      body: `${result.message || 'Something went wrong.'} Your answers are still on this page, so you can try again.`,
    },
  }[result.status];

  return (
    <div className={`notice ${view.cls}`} role="status" aria-live="polite">
      <view.Icon size={22} aria-hidden="true" />
      <div>
        <p className="notice-title">{view.title}</p>
        <p>{view.body}</p>
        {onReset && result.status !== 'failed' && (
          <button type="button" className="btn btn-ghost btn-sm" onClick={onReset}>{resetLabel}</button>
        )}
      </div>
    </div>
  );
}
