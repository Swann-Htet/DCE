// Renders plain text and turns http(s) links into small red links (no underline) that open in a new tab.
// Only http:// and https:// are linked, and React escapes everything else, so a bio cannot inject markup.
const URL_RE = /(https?:\/\/[^\s<>"']+)/g;
const TRAILING = /[.,;:!?)\]]+$/;

export default function Linkify({ text }) {
  if (!text) return null;
  return text.split(URL_RE).map((part, i) => {
    if (i % 2 === 0) return part;
    const url = part.replace(TRAILING, '');
    const rest = part.slice(url.length);
    const label = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
    return (
      <span key={i}>
        <a className="bio-link" href={url} target="_blank" rel="noopener noreferrer">{label}</a>
        {rest}
      </span>
    );
  });
}
