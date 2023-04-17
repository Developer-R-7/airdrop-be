export type User = {
  _id: string;
  name: string;
  joined_at: Date;
  updated_at: Date;
  wallet_address: string;
  subscription_tier: number;
  enrolled_company: string[];
  airdrop: string[];
  username: string;
  email: string;
  social_links: { twitter: string; discord: string };
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
