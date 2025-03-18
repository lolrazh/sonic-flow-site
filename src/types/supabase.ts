export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          created_at: string;
          email: string | null;
          display_name: string | null;
        };
        Insert: {
          id: string;
          created_at?: string;
          email?: string | null;
          display_name?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          email?: string | null;
          display_name?: string | null;
        };
      };
    };
  };
}; 