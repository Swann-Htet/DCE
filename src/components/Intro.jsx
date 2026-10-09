// Section heading block used at the top of each full-screen section.
// `as` lets pages choose h1 (first screen) or h2.
export default function Intro({ eyebrow, title, as: Tag = 'h2', id, children, className = '' }) {
  return (
    <header className={`intro ${className}`}>
      {eyebrow && <p className="eyebrow" data-reveal>{eyebrow}</p>}
      <Tag id={id} className="display-md" data-reveal style={{ '--i': 1 }}>{title}</Tag>
      {children && <p className="lead" data-reveal style={{ '--i': 2 }}>{children}</p>}
    </header>
  );
}
