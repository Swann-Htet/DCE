import { Fragment } from 'react';

// Splits a headline into words that rise in one after another (CSS animation, staggered by --i).
// The space sits outside the inline-block so it is not collapsed.
export default function Words({ text }) {
  return text.split(' ').map((w, i) => (
    <Fragment key={`${w}-${i}`}>
      <span className="w" style={{ '--i': i }}><span>{w}</span></span>{' '}
    </Fragment>
  ));
}
