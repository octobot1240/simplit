export type DocType = 'nie_dni' | 'nomina' | 'contrato_trabajo' | 'declaracion_renta';
export type DocStatus = 'pending' | 'verified' | 'rejected';
export type Plan = 'free' | 'premium_monthly' | 'premium_annual';
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing';
export type InvitationStatus = 'pending' | 'accepted' | 'rejected';

export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  profile_complete: boolean;
  profile_visible: boolean;
  income_range: string | null;
  employment_type: string | null;
  employment_duration: string | null;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  user_id: string;
  doc_type: DocType;
  file_name: string;
  file_url: string;
  file_size: number | null;
  status: DocStatus;
  rejection_reason: string | null;
  extracted_data: any | null;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  plan: Plan;
  status: SubscriptionStatus;
  current_period_start: string | null;
  current_period_end: string | null;
  created_at: string;
  updated_at: string;
}

export interface AgencyInvitation {
  id: string;
  user_id: string;
  agency_name: string;
  agency_email: string | null;
  message: string;
  property_type: string | null;
  neighborhood: string | null;
  status: InvitationStatus;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}
