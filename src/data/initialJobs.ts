import { Internship } from '../types';

export const INITIAL_INTERNSHIPS: Internship[] = [
  {
    id: 'nbk-finance-2026',
    title: 'Corporate Banking Intern',
    company: 'Company A',
    companyLogoBg: 'bg-blue-900',
    location: 'Sharq, Kuwait City',
    eligibility: 'Kuwaiti National',
    isRemote: false,
    isFullTime: true,
    isPaid: true,
    stipend: '350 KWD/Month',
    duration: '3 Months',
    datePosted: '2026-06-27',
    description: 'Join a premier banking institution in Kuwait for an immersive experience in our Corporate Banking division. You will work alongside seasoned credit analysts, assist in credit appraisal, shadow client relations managers, and contribute to market research. This program offers a direct pathway to our flagship graduate program.',
    qualifications: [
      'Recent graduate or final-year student in Finance, Accounting, Economics, or related fields',
      'Minimum GPA of 3.0 or equivalent',
      'Excellent analytical skills and proficiency in MS Excel',
      'Strong bilingual communication skills (Arabic and English) is required',
      'Ability to work full-time hours at our Head Office in Sharq'
    ],
    responsibilities: [
      'Assist credit analysts in compiling financial statements and preparing research reports',
      'Conduct comparative industry analyses on current corporate borrowers',
      'Support client management teams in preparing presentation pitch books',
      'Participate in structured financial modeling training and mock credit committees'
    ],
    aboutCompany: 'Company A is a leading financial institution in Kuwait, renowned for its strong brand reputation and legacy of supporting Kuwaiti national talent through industry-leading developmental programs.'
  },
  {
    id: 'zain-software-2026',
    title: 'Software Engineer Intern (Mobile Apps)',
    company: 'Company B',
    companyLogoBg: 'bg-teal-600',
    location: 'Shuwaikh',
    eligibility: 'All',
    isRemote: false,
    isFullTime: true,
    isPaid: true,
    stipend: '300 KWD/Month',
    duration: '6 Months',
    datePosted: '2026-06-26',
    description: 'We are a pioneer of mobile telecommunications in the Middle East. We are looking for an ambitious Software Engineering Intern to join our Digital Products division. You will work on real customer-facing mobile applications, learn modern Flutter/Swift development workflows, and participate in daily agile standups.',
    qualifications: [
      'Recent graduate with a Bachelor’s degree in Computer Science, Computer Engineering, or Software Engineering',
      'Familiarity with Dart/Flutter, Swift, or React Native through academic or personal projects',
      'Basic understanding of RESTful APIs, Git version control, and JSON formatting',
      'Passionate about building intuitive mobile user interfaces and solving logical challenges',
      'Open to both Kuwaiti nationals and expat applicants residing in Kuwait'
    ],
    responsibilities: [
      'Write clean, testable code to assist in bug fixes and minor feature enhancements on our main mobile apps',
      'Collaborate with UX/UI designers to translate high-fidelity Figma mockups into modular code',
      'Perform manual and semi-automated regression testing on staging app releases',
      'Document API endpoints and application flow in our internal wiki'
    ],
    aboutCompany: 'Company B is a market leader in telecom services. Our digital division drives cutting-edge innovations in fintech, mobile entertainment, and 5G network integration, offering a highly dynamic environment for fresh graduates.'
  },
  {
    id: 'floward-marketing-2026',
    title: 'Digital Marketing & Content Intern',
    company: 'Company C',
    companyLogoBg: 'bg-rose-500',
    location: 'Salmiya',
    eligibility: 'Expat Friendly',
    isRemote: false,
    isFullTime: false,
    isPaid: true,
    stipend: '200 KWD/Month',
    duration: '3 Months',
    datePosted: '2026-06-25',
    description: 'We are a popular online flowers and gifts destination in the GCC region. We are seeking a creative Digital Marketing Intern to join our Salmiya-based hub. You will assist in content ideation, copywriting for local social media feeds, tracking engagement metrics, and coordinating lifestyle photo shoots.',
    qualifications: [
      'Degree in Marketing, Communications, English Literature, Graphic Design, or related creative disciplines',
      'Deep familiarity with Instagram, TikTok, and Snapchat trends in Kuwait',
      'Exceptional copywriting skills in both English and colloquial Kuwaiti Arabic',
      'Basic experience with Canva, Adobe Lightroom, or CapCut for quick content editing',
      'Highly organized with a keen eye for modern aesthetic trends'
    ],
    responsibilities: [
      'Draft creative content calendars and write engaging captions in Arabic and English',
      'Assist the production crew on-site during seasonal product shoots (e.g. graduation season, summer trends)',
      'Monitor and compile social media engagement reports and influencer outreach logs',
      'Support community management by flagging and answering customer comments and queries online'
    ],
    aboutCompany: 'Company C is a high-growth scale-up operating across multiple international markets. We pride ourselves on a vibrant, young, and highly collaborative office atmosphere that nurtures entrepreneurial mindsets.'
  },
  {
    id: 'boubyan-tech-2026',
    title: 'Cybersecurity Analyst Intern',
    company: 'Company D',
    companyLogoBg: 'bg-lime-700',
    location: 'Sharq, Kuwait City',
    eligibility: 'Kuwaiti National',
    isRemote: false,
    isFullTime: true,
    isPaid: true,
    stipend: '300 KWD/Month',
    duration: '3 Months',
    datePosted: '2026-06-24',
    description: 'We are pioneering digital banking solutions in the region. Our Information Security team is recruiting a Cybersecurity Analyst Intern. This specialized program exposes you to real-world security operations, vulnerability scanning, employee security awareness training, and banking compliance protocols.',
    qualifications: [
      'Bachelor’s degree in Information Security, Computer Engineering, or Cybersecurity',
      'Basic knowledge of networking (TCP/IP), OWASP Top 10 vulnerabilities, and security baselines',
      'Hands-on classroom experience with Linux operating systems and script writing (e.g., Python, Bash)',
      'High integrity and standard of ethics given the sensitive nature of banking logs',
      'Bilingual proficiency in Arabic and English is highly desired'
    ],
    responsibilities: [
      'Assist in monitoring security alerts from our SIEM console and drafting triage summaries',
      'Help prepare and launch internal phishing simulation campaigns for bank employees',
      'Participate in reviewing security architecture checklists for new digital features',
      'Support compliance auditors with gathering security posture documentation'
    ],
    aboutCompany: 'Company D is a progressive bank in Kuwait. We are internationally recognized for our digital solutions and our focus on cultivating tech talent inside the country.'
  },
  {
    id: 'alshaya-hr-2026',
    title: 'Human Resources (Talent Acquisition) Intern',
    company: 'Company E',
    companyLogoBg: 'bg-indigo-900',
    location: 'Al Rai',
    eligibility: 'All',
    isRemote: true,
    isFullTime: false,
    isPaid: false,
    stipend: 'Unpaid (Certificate + Reference)',
    duration: '2 Months',
    datePosted: '2026-06-23',
    description: 'We are a leading international franchise operator with a portfolio of world-renowned retail and dining brands. This remote internship in our Talent Acquisition division will teach you standard corporate recruitment processes, CV screening methodologies, and applicant tracking software.',
    qualifications: [
      'Recent graduate in Business Administration, Human Resources, Psychology, or English',
      'Strong organizational skills with ability to manage high-volume email correspondences',
      'Excellent command of spoken and written English; Arabic is a huge plus',
      'Comfortable using Zoom, MS Teams, and digital collaboration spreadsheets',
      'Reliable high-speed internet and quiet workspace for remote coordination'
    ],
    responsibilities: [
      'Screen candidate resumes against specified job profiles for retail corporate divisions',
      'Coordinate and schedule initial Zoom screenings for shortlisted international candidates',
      'Maintain and update the regional recruitment tracker spreadsheet',
      'Participate in onboarding coordination sessions for retail management trainees'
    ],
    aboutCompany: 'Company E is a global retail franchise powerhouse. Operating over 70 of the world’s most recognized brands, we offer unparalleled exposure to international business standards right here in Kuwait.'
  },
  {
    id: 'creative-lab-design-2026',
    title: 'Graphic Design & Branding Intern',
    company: 'Company F',
    companyLogoBg: 'bg-purple-600',
    location: 'Salmiya',
    eligibility: 'Expat Friendly',
    isRemote: true,
    isFullTime: false,
    isPaid: true,
    stipend: '150 KWD/Month',
    duration: '3 Months',
    datePosted: '2026-06-22',
    description: 'We are a boutique design studio in Salmiya catering to Kuwait’s thriving food & beverage (F&B) and retail startup ecosystem. We are looking for a remote Graphic Design intern to support branding projects, package design, and digital asset production.',
    qualifications: [
      'Portfolio displaying strong foundation in typography, color theory, and layout composition',
      'Proficiency in Adobe Illustrator and Photoshop is essential; Indesign or Figma is a plus',
      'Passion for packaging design and editorial style guides',
      'Self-driven individual who manages independent creative tasks effectively',
      'Must have access to personal laptop with active Creative Cloud license'
    ],
    responsibilities: [
      'Draft social media post graphics and stories for local restaurants and coffee shops',
      'Assist senior designers in assembling brand guidelines decks for newly launched startups',
      'Iterate on print-ready coffee cup, paper bag, and shipping box mockups',
      'Research and mood-board visual trends for upcoming design seasons in the GCC'
    ],
    aboutCompany: 'Company F has shaped the visual identity of dozens of beloved local coffee shops, burger spots, and fashion concepts. We offer a highly collaborative, fast-paced atmosphere with a strong emphasis on contemporary design principles.'
  },
  {
    id: 'deliveroo-ops-2026',
    title: 'Operations Excellence Intern',
    company: 'Company G',
    companyLogoBg: 'bg-emerald-500',
    location: 'Kuwait City',
    eligibility: 'All',
    isRemote: false,
    isFullTime: true,
    isPaid: true,
    stipend: '280 KWD/Month',
    duration: '3 Months',
    datePosted: '2026-06-20',
    description: 'We are on a mission to build a leading food delivery application. We are seeking an Operations Excellence Intern in Kuwait City to help optimize rider onboarding, coordinate localized geo-mapping parameters, and interpret operational dispatch statistics.',
    qualifications: [
      'Degree in Industrial Engineering, Business Analytics, Operations Management, or related analytical fields',
      'Strong logical thinking skills and intermediate Excel mastery (Pivot tables, vlookup/Xlookup)',
      'Highly proactive communicator comfortable talking to riders, operations agents, and external suppliers',
      'Thrives in high-pressure, fast-paced environments where everyday brings different challenges',
      'Fluency in English is essential; knowledge of Urdu, Hindi, or Arabic is highly beneficial'
    ],
    responsibilities: [
      'Track rider onboarding metrics and identify bottlenecks in our registration pipeline',
      'Analyze localized delivery times across different districts of Kuwait to flag delay hotspots',
      'Coordinate the distribution of rider gear and manage the safety kit inventory logs',
      'Draft weekly operational performance slide decks for leadership syncs'
    ],
    aboutCompany: 'Company G is a vibrant office that combines the speed of a tech startup with the security of a global market leader. We operate with a flat hierarchy where every voice counts.'
  }
];
