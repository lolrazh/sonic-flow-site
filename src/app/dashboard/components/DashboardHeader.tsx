"use client";

import { BiLogOut } from "react-icons/bi";
import { createClient } from "@supabase/supabase-js";
import SiteName from "~/app/_components/shared/SiteName";

// Create Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function DashboardHeader() {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <header className="border-b border-dark-700 bg-dark-800">
      <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between px-4 py-4 md:flex-row">
        <div className="mb-4 flex items-center md:mb-0">
          <SiteName />
        </div>

        <button 
          onClick={handleSignOut}
          className="flex items-center rounded-lg px-3 py-2 text-sm text-dark-200 hover:bg-dark-700 hover:text-dark-50"
        >
          <BiLogOut className="mr-2" size={18} />
          Sign Out
        </button>
      </div>
    </header>
  );
} 