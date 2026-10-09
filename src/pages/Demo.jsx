import { MessageSquareText } from 'lucide-react';
import DemoForm from '../components/DemoForm';
import Intro from '../components/Intro';

export default function Demo() {
  return (
    <section className="screen screen-page" aria-labelledby="demo-title">
      <div className="blob blob-soft" aria-hidden="true" />
      <div className="container split split-form">
        <div>
          <Intro as="h1" id="demo-title" eyebrow="Request a demo" title="See DCE in action">
            Tell us about your institution and what you need from online exams. We will get in touch to
            discuss your needs and arrange a product demonstration.
          </Intro>
          <p className="proto-note" data-reveal style={{ '--i': 3 }}>
            <MessageSquareText size={18} aria-hidden="true" />
            <span>Prototype notice: until a form backend is connected, requests are validated but not delivered.</span>
          </p>
        </div>
        <div data-reveal="scale" style={{ '--i': 2 }}><DemoForm /></div>
      </div>
    </section>
  );
}
