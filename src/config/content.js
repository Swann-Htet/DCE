// Marketing copy, grounded in the existing exam system (D:\DCE EXAM\dce-exam-system).
// `check` marks wording that should be confirmed with the product owner before launch;
// it renders a review marker only when VITE_SHOW_REVIEW_MARKERS=true.
// Source notes are for maintainers and are not shown to visitors.

export const VALUE_POINTS = [
  { icon: 'Workflow', title: 'Streamline online exams', text: 'Set up courses, exams and question banks, and give students one clear route into each exam.' },
  { icon: 'UserCheck', title: 'Support identity checks', text: 'Combine sign-in, a per-student QR checkpoint and selfie confirmation before an exam begins.' },
  { icon: 'Eye', title: 'Review monitoring signals', text: 'Lecturers see recorded signals such as tab switches alongside each attempt, to inform their own judgement.' },
  { icon: 'FileBarChart', title: 'Report with context', text: 'Results sit next to warning counts, with configurable limits, and can be exported as CSV.' },
];

export const FEATURES = [
  {
    icon: 'ClipboardList',
    title: 'Online Exam Management',
    text: 'Lecturers create courses, set exam duration and publish windows, and build a question bank with true/false, single-choice, multiple-choice and sorting questions.',
    // source: ExamSettings.jsx, QuestionBank.jsx, README roles
  },
  {
    icon: 'QrCode',
    title: 'Identity Verification',
    text: 'Students sign in with their email or student ID, scan a QR checkpoint issued for their course access, and confirm with a selfie before the exam starts.',
    // source: authController.js (email OR student_id), QRScan.jsx, FaceConfirm.jsx
  },
  {
    icon: 'Camera',
    title: 'Camera Checks',
    text: 'A selfie is captured before the exam, and attempt records include a camera-warning count that lecturers can review in results.',
    check: 'Live in-exam webcam monitoring is not confirmed in the codebase: the camera_warning_count field and setting exist, but only the pre-exam selfie is implemented.',
  },
  {
    icon: 'AppWindow',
    title: 'Tab-Switch Monitoring',
    text: 'Leaving the exam tab is counted for the attempt and shown to the student as a warning. The count is available to lecturers as a signal for review.',
    // source: useTabSwitchDetector.js, ExamRoom.jsx, ExamAttempt.tab_switch_count
  },
  {
    icon: 'SlidersHorizontal',
    title: 'Configurable Warnings',
    text: 'Lecturers set tab-switch and cursor-boundary limits for each exam, so monitoring can be matched to the style of assessment.',
    // source: ExamSettings.jsx (tabSwitchLimit, cursorBoundaryLimit)
  },
  {
    icon: 'FileText',
    title: 'Evidence and Reporting',
    text: 'The results table shows scores next to tab-switch, cursor-boundary and camera warning counts, with CSV export for records and further review.',
    check: 'Brief mentions "evidence logs". The schema has a proctor_log_url field but no UI that uses it; confirm before claiming logs or evidence files.',
    // source: ExamResults.jsx, resultsController.js exportCSV
  },
];

export const STEPS = [
  { title: 'Configure the exam', text: 'The institution sets up courses, questions, timing and warning limits.' },
  { title: 'Students verify and enter', text: 'Students sign in, complete the QR checkpoint and selfie confirmation, then start the exam.' },
  { title: 'Signals are recorded', text: 'During the exam, configured monitoring signals are counted and students see warnings.' },
  { title: 'Lecturers review', text: 'Staff review scores and flagged signals, then decide what, if anything, needs follow-up.' },
];

export const SECURITY_POINTS = [
  { icon: 'ShieldCheck', title: 'Signals, not verdicts', text: 'Monitoring events are prompts for human review. They are not proof of misconduct, and decisions stay with your staff.' },
  { icon: 'Users', title: 'Role-based access', text: 'The platform separates student, lecturer and administrator areas, so each role sees the tools meant for it.' },
  { icon: 'IdCard', title: 'Identity steps are visible', text: 'Students are told when sign-in, QR and selfie checks are needed, and warnings appear on screen during the exam.' },
  { icon: 'Lock', title: 'Details to be confirmed', text: 'Data retention, encryption, hosting and compliance information has not been published yet. We will not state any until it is verified and documented.' },
];

// About Us text is paraphrased from the project report "Online Exam Proctoring System"
// (Mae Fah Luang University, Academic Year 2026). The advisor's name uses the report's spelling.
export const ABOUT = {
  background:
    'Online examinations save time and printing and support flexible learning, but they raise concerns about academic integrity: students may switch tabs, get help from others, or let someone else sit the exam. Conventional web exam tools deliver questions and grade them, yet offer little identity verification or monitoring.',
  problem:
    'Commercial proctoring can be costly, hard to customise and too complex for local academic needs. We wanted one practical, university-oriented platform that combines exam management, browser activity monitoring, identity checks and evidence review, suitable for cloud deployment.',
  approach:
    'DCE favours transparent, rule-based monitoring over opaque algorithms: observable events such as repeated tab switches are counted against limits that lecturers set, and the results are presented for human review.',
  objectives: [
    'Provide secure login, exam management and role-based access for lecturers and students.',
    'Let lecturers create, edit and manage exams and several question types.',
    'Verify students before the exam with webcam permission checks and institutional email login.',
    'Detect suspicious behaviour with predefined rules, such as tab switching, multiple faces and repeated head turns.',
    'Give lecturers reports, logs and media records to review suspicious or terminated sessions.',
  ],
  team: [
    { name: 'Swan Htet', role: 'Project Manager' },
    { name: 'Arkar Pyae Phyo', role: 'AI Engineer' },
    { name: 'Aung Myint Myat', role: 'Cloud Engineer' },
  ],
  coordinator: 'Asst. Prof. Dr. Suppakarn Chansareewittaya, Ph.D.',
  committee: ['Asst. Prof. Dr. Sirikan Chucherd, Ph.D.', 'Dr. Titiya Chomngen, Ph.D.'],
  limitations: [
    'DCE is a web-based system; there is no mobile application.',
    'Advanced AI analysis such as emotion recognition, voice analysis or full gaze tracking is not included.',
    'Integration with external university grading systems is outside the current scope.',
    'It was built as a prototype for academic use and may need further optimisation, wider testing, and privacy and policy review before large-scale deployment.',
  ],
};
