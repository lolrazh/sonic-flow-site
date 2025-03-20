"use client";

import { BiLogOut } from "react-icons/bi";
import { SiteName } from "~/components/ui";
import { supabase } from "~/lib/auth";

export default function DashboardHeader() {
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="border-b border-white/5 bg-[rgb(18,18,18)]">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between px-8 py-4 md:flex-row">
        <div className="mb-4 flex items-center md:mb-0">
          <SiteName />
        </div>

        <button 
          onClick={handleSignOut}
          className="flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 font-lexend text-sm text-white/90 transition-colors hover:bg-white/10"
        >
          <BiLogOut className="mr-2" size={18} />
          sign out
        </button>
      </div>
    </header>
  );
} 