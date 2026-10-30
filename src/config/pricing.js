// Default pricing, shown until the admin saves plans in Supabase (and whenever Supabase is not configured).
// Keep in step with the seed in supabase/pricing.sql. The numbers are suggested starting points for a business
// decision, not an agreed price list: the admin edits them in Admin -> Pricing.
export const DEFAULT_PRICING_TEXT = {
  intro: 'Start with a free pilot in one course, then license DCE for a department or the whole institution.',
  footnote: 'Prices are in Thai baht, per year, excluding VAT. Student limits are per academic year. Final terms are agreed in the quotation.',
};

export const DEFAULT_PLANS = [
  {
    slug: 'pilot', sort_order: 1, is_active: true, name: 'Pilot',
    tagline: 'Try DCE in one course for one semester.',
    price_text: 'Free', price_note: 'one course, one semester, up to 60 students',
    features: [
      'Exam builder with true/false, single choice, multiple choice and sorting questions',
      'Student sign-in with student ID, course access code, QR checkpoint and selfie',
      'Tab-switch and cursor-boundary warnings with lecturer-set limits',
      'Automatic scoring and results export (CSV / Excel)',
      'Student answer review, set by the lecturer',
      'Email support',
    ],
    highlight: false, badge_text: '', cta_label: 'Start a pilot', cta_link: '/demo?plan=pilot',
  },
  {
    slug: 'department', sort_order: 2, is_active: true, name: 'Department',
    tagline: 'For a department that runs its exams on DCE.',
    price_text: 'THB 19,900', price_note: 'per department, per year, up to 500 students',
    features: [
      'Everything in Pilot',
      'Unlimited courses, exams and lecturers',
      'Camera eye check (warning only) and live camera view for lecturers',
      'Question import from Excel and AI-assisted import',
      'Lecturer audit, login logs and one-device-per-student control',
      'Branded email with login details for new lecturers',
      'Email support',
    ],
    highlight: true, badge_text: 'Recommended', cta_label: 'Request a demo', cta_link: '/demo?plan=department',
  },
  {
    slug: 'institution', sort_order: 3, is_active: true, name: 'Institution',
    tagline: 'For a faculty or the whole university.',
    price_text: 'Custom', price_note: 'per institution, per year - volume pricing',
    features: [
      'Everything in Department',
      'LMS integration with Moodle (LTI 1.3)',
      'Several administrators with emailed one-time codes',
      'Server workload and login monitoring for administrators',
      'Onboarding and lecturer training',
      'Setup help for running on your own server',
      'Priority support',
    ],
    highlight: false, badge_text: '', cta_label: 'Contact us', cta_link: '/demo?plan=institution',
  },
];

// A plan link must stay on this site or be https; anything else (javascript:, data:, http:) is dropped.
export const safeLink = (href) => (/^\/(?!\/)/.test(href || '') || /^https:\/\/\S+$/.test(href || '') ? href : '/demo');
