// Product name is DCE. Contact email is a placeholder until a real address exists (VITE_CONTACT_EMAIL).
export const BRAND_NAME = import.meta.env.VITE_BRAND_NAME || 'DCE';
export const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || '';
export const SHOW_REVIEW_MARKERS = import.meta.env.VITE_SHOW_REVIEW_MARKERS === 'true';

export const INSTITUTION = 'Mae Fah Luang University';
export const PROGRAM = 'Digital and Communication Engineering';

export const NAV_LINKS = [
  { label: 'Features', to: '/features' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Security & Privacy', to: '/security' },
  { label: 'About Us', to: '/about' },
  { label: 'Feedback', to: '/feedback' },
];
