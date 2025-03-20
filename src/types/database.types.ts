export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      customers: {
        Row: {
          id: string;
          paddle_customer_id: string | null;
          email: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          paddle_customer_id?: string | null;
          email: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          paddle_customer_id?: string | null;
          email?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          paddle_subscription_id: string;
          paddle_plan_id: string;
          status: string;
          current_period_start: string;
          current_period_end: string;
          cancel_at: string | null;
          canceled_at: string | null;
          trial_start: string | null;
          trial_end: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          paddle_subscription_id: string;
          paddle_plan_id: string;
          status: string;
          current_period_start: string;
          current_period_end: string;
          cancel_at?: string | null;
          canceled_at?: string | null;
          trial_start?: string | null;
          trial_end?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          paddle_subscription_id?: string;
          paddle_plan_id?: string;
          status?: string;
          current_period_start?: string;
          current_period_end?: string;
          cancel_at?: string | null;
          canceled_at?: string | null;
          trial_start?: string | null;
          trial_end?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      transactions: {
        Row: {
          id: string;
          subscription_id: string | null;
          user_id: string;
          paddle_transaction_id: string;
          amount: number;
          currency: string;
          status: string;
          billing_period_start: string | null;
          billing_period_end: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          subscription_id?: string | null;
          user_id: string;
          paddle_transaction_id: string;
          amount: number;
          currency: string;
          status: string;
          billing_period_start?: string | null;
          billing_period_end?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          subscription_id?: string | null;
          user_id?: string;
          paddle_transaction_id?: string;
          amount?: number;
          currency?: string;
          status?: string;
          billing_period_start?: string | null;
          billing_period_end?: string | null;
          created_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          paddle_product_id: string;
          name: string;
          description: string | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          paddle_product_id: string;
          name: string;
          description?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          paddle_product_id?: string;
          name?: string;
          description?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      prices: {
        Row: {
          id: string;
          product_id: string;
          paddle_price_id: string;
          currency: string;
          unit_price: number;
          billing_period: string;
          trial_period_days: number | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          paddle_price_id: string;
          currency: string;
          unit_price: number;
          billing_period: string;
          trial_period_days?: number | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          paddle_price_id?: string;
          currency?: string;
          unit_price?: number;
          billing_period?: string;
          trial_period_days?: number | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
} 