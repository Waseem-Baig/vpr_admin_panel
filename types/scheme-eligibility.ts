export interface SchemeEligibility {
  id: string;
  user_id: string | null;
  fullname: string | null;
  age: number | null;
  gender: string | null;
  mobile: string | null;
  aadhaar: string | null;
  caste: string | null;
  marital: string | null;
  disability: string | null;
  disability_details: string | null;
  income: string | null;
  education: string | null;
  employment: string | null;
  skill_training: string | null;
  skill_training_details: string | null;
  social_service: string | null;
  social_service_details: string | null;
  welfare_member: string | null;
  schemes: string | null;
  submitted_at: string; // ISO timestamp string
}
