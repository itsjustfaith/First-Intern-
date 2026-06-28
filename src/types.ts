export type EligibilityType = 'Kuwaiti National' | 'Expat Friendly' | 'All';

export interface Internship {
  id: string;
  title: string;
  company: string;
  companyLogoBg: string; // Tailwind color class, e.g., 'bg-blue-600'
  location: string; // Kuwait City, Sharq, Salmiya, etc.
  eligibility: EligibilityType;
  isRemote: boolean;
  isFullTime: boolean;
  isPaid: boolean;
  stipend?: string; // e.g. "250 KWD/month"
  duration: string; // e.g. "3 Months"
  datePosted: string; // YYYY-MM-DD
  description: string;
  qualifications: string[];
  responsibilities: string[];
  aboutCompany: string;
}

export interface ApplicationInput {
  fullName: string;
  email: string;
  phone: string;
  university: string;
  major: string;
  graduationYear: string;
  resumeName: string;
  coverLetter?: string;
}
