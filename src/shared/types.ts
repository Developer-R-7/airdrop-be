export type User = {
  _id: string;
  name: string;
  user_id: string;
  joined_at: Date;
  updated_at: Date;
  wallet_address: string;
  subscription_tier: number;
  enrolled_company: string[];
  username: string;
  email: string;
  social_links: { label: string; link: string }[];
  source_id: number;
  trial_period: boolean;
};

export type Company = {
  _id: string;
  display_name: string;
  company_logo: string;
  user_name: string;
  password: string;
  company_task_list: string[];
  company_description: string;
  joined_at: Date;
  enrolled_users: string[];
  social_links: { label: string; link: string }[];
  company_website: string;
};
