// Privacy Policy content, v1.0, written for the DCE student project and confirmed by the project owners.
// Facts about the stack (Supabase Tokyo region, Vercel hosting, row-level security, disabled sign-ups) reflect how
// this repository is configured. Nothing here claims an ISO certification.

export const POLICY_VERSION = '1.0';
export const POLICY_DATE = '9 October 2026';

export const OWNERS = [
  { name: 'Swan Htet', role: 'Project Manager' },
  { name: 'Arkar Pyae Phyo', role: 'AI Engineer' },
  { name: 'Aung Myint Myat', role: 'Cloud Engineer' },
];
export const ADVISOR = 'Asst. Prof. Dr. Suppakarn Chansareewittaya, Ph.D.';

export const COLLECTED = [
  { what: 'Demo requests', data: 'Full name, work or university email, institution, role, what you want to learn about, your consent, and the time of the request.', why: 'To contact you about a demonstration you asked for.' },
  { what: 'Survey responses', data: 'Your answers to the Website UX, Lecturer Panel or Advertising Preferences surveys, and the time. No name or email is asked. Written comments are free text, so please do not include personal details.', why: 'To improve the website and the lecturer panel and to learn visitor preferences.' },
  { what: 'Administrator accounts', data: 'Email address and sign-in session of the few people who manage this site. Passwords are handled by the authentication service and are never visible to us.', why: 'To protect the admin panel and the data inside it.' },
  { what: 'Team and advisor profiles', data: 'Name, role, short bio and photo of project members, uploaded by an administrator with the person\'s agreement.', why: 'To show who built and advises the project.' },
  { what: 'Technical logs', data: 'Standard hosting logs (for example IP address, browser type and pages requested) kept by the hosting provider for operation and security.', why: 'To keep the site running and to detect abuse.' },
];

export const NOT_COLLECTED = 'This website does not collect payment details, national ID numbers, passwords of visitors, or any biometric data. It does not use advertising networks, tracking pixels or third-party analytics.';

export const PROCESSORS = [
  { name: 'Supabase', does: 'Database, administrator sign-in and photo storage. Project region: Northeast Asia (Tokyo).' },
  { name: 'Vercel', does: 'Hosting and delivery of the website, including standard hosting logs.' },
  { name: 'GitHub', does: 'Stores the source code of the website. No visitor data is kept there.' },
];

export const RETENTION = [
  { item: 'Demo requests', period: 'Up to 12 months after the last contact, then deleted.' },
  { item: 'Survey responses', period: 'Up to 24 months, after which they are deleted or kept only as anonymous totals.' },
  { item: 'Administrator accounts', period: 'While the person manages the site; removed when their access ends.' },
  { item: 'Team profiles and photos', period: 'While the person is part of the project, or until they ask for removal.' },
];

export const SECURITY = [
  'The website is served over HTTPS.',
  'The public can only add new demo requests and survey answers. It cannot read, change or delete any stored data; this is enforced in the database with row-level security.',
  'Only accounts on an administrator allow-list can read submissions, see charts or manage profiles. Public sign-ups are switched off, so no one can create an account on their own.',
  'The browser only ever holds the public key. Server-side secret keys are never placed in the website.',
  'Photo uploads are limited to JPG, PNG or WebP images up to 2 MB and can be added or removed by administrators only.',
  'No system is perfectly secure. If a breach affecting personal data occurs, we will assess it and notify the people and the authority concerned as the law requires.',
];

export const ISO = [
  { std: 'ISO/IEC 27001 and 27002', topic: 'Information security management and controls', how: 'Access control and least privilege (admin allow-list, row-level security), secrets kept out of the website, and a regular review of who has access.' },
  { std: 'ISO/IEC 27701', topic: 'Privacy information management', how: 'Clear roles for who decides how data is used, a record of what is collected and why (this policy), and a process for handling rights requests.' },
  { std: 'ISO/IEC 29100', topic: 'Privacy framework', how: 'Consent and choice, purpose specification, data minimisation, limited use and retention, openness, individual participation and accountability, as set out in the sections of this policy.' },
  { std: 'ISO 9241-210', topic: 'Human-centred design', how: 'The website and surveys are designed around user needs and tested with feedback from lecturers and visitors, with accessible forms and clear error messages.' },
  { std: 'ISO/IEC 25010', topic: 'Software product quality', how: 'Usability, reliability and security are the quality characteristics we check before each release (lint, build and manual testing).' },
];
export const ISO_NOTE = 'DCE is a university student project. It is not certified under any ISO standard and does not claim to be. These standards are used as guidance for how we design and operate it.';

export const MFU = [
  'DCE is developed and operated inside Mae Fah Luang University, School of Applied Digital Technology, Digital and Communication Engineering, under the supervision of the project advisor.',
  'It follows the university\'s applicable regulations on information technology and network use, on student conduct, academic integrity and examinations, and on the protection of personal data. Where DCE and a university rule differ, the university rule prevails.',
  'In the exam application, the lecturer decides the exam rules for each course. Monitoring signals such as tab switches or cursor movements are prompts for a person to review. They are never proof of misconduct, and any academic decision follows the university\'s procedures.',
  'Taking part in the surveys is voluntary and you can stop at any time without giving a reason. Student feedback is used only to improve the system.',
  'Concerns about how DCE is used in a course can be raised with the course lecturer, the project advisor or the university, using the normal university channels.',
];

export const RIGHTS = [
  'Ask to see the personal data we hold about you and to receive a copy.',
  'Ask us to correct data that is wrong or incomplete.',
  'Ask us to delete your data, or to stop using it, where the law allows.',
  'Object to how your data is used, and withdraw your consent at any time (withdrawing does not affect what was done before).',
  'Ask to receive your data in a commonly used format where this applies.',
  'Complain to the Personal Data Protection Committee of Thailand if you believe your data is handled unlawfully.',
];
export const RIGHTS_NOTE = 'To use these rights, contact us using the details below. We aim to answer within 30 days. Because surveys do not ask for your name, we may not be able to find a particular survey answer; demo requests can be found by the email you used.';

export const SECTIONS = [
  { id: 'who', title: 'Who we are' },
  { id: 'scope', title: 'What this policy covers' },
  { id: 'collect', title: 'What we collect and why' },
  { id: 'sharing', title: 'Who handles your data' },
  { id: 'retention', title: 'How long we keep it' },
  { id: 'security', title: 'How we protect it' },
  { id: 'iso', title: 'ISO standards we use as guidance' },
  { id: 'mfu', title: 'MFU rules and regulations' },
  { id: 'rights', title: 'Your rights' },
  { id: 'other', title: 'Cookies, children and surveys' },
  { id: 'changes', title: 'Changes and contact' },
];
