export interface YuvaShakthiMember {
  id: string;
  user_id: string | null;
  fullname: string | null;
  parentname: string | null;
  dob: string | null; // ISO date string
  gender: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  village: string | null;
  mandal: string | null;
  constituency: string | null;
  district: string | null;
  education: string | null;
  stream: string | null;
  occupation: string | null;
  skills: string | null;
  interests: string[] | null;
  interest_other: string | null;
  why: string | null;
  submitted_at: string; // ISO timestamp string
}
