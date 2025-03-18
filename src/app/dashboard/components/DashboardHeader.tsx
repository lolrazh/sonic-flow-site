"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiHome, BiCog, BiAnalyse, BiLogOut } from "react-icons/bi";
import { createClient } from "@supabase/supabase-js";

// Create Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavLink = ({ href, icon, label, isActive }: NavLinkProps) => (
  <Link 
    href={href} 
    className={`flex items-center rounded-lg px-3 py-2 text-sm ${
      isActive 
        ? "bg-accent-600/10 text-accent-500" 
        : "text-dark-200 hover:bg-dark-700 hover:text-dark-50"
    }`}
  >
    <span className="mr-2">{icon}</span>
    {label}
  </Link>
);

export default function DashboardHeader() {
  const pathname = usePathname();
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <header className="border-b border-dark-700 bg-dark-800">
      <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between px-4 py-4 md:flex-row">
        <div className="mb-4 flex items-center md:mb-0">
          <h1 className="text-xl font-bold text-dark-50">
            <span className="bg-gradient-to-r from-accent-500 to-accent-400 bg-clip-text text-transparent">
              Sonic Flow
            </span>
          </h1>
        </div>

        <nav className="flex w-full space-x-1 overflow-x-auto md:w-auto">
          <NavLink 
            href="/dashboard" 
            icon={<BiHome size={18} />} 
            label="Dashboard" 
            isActive={pathname === "/dashboard"}
          />
          <NavLink 
            href="/dashboard/usage" 
            icon={<BiAnalyse size={18} />} 
            label="Usage" 
            isActive={pathname === "/dashboard/usage"}
          />
          <NavLink 
            href="/dashboard/settings" 
            icon={<BiCog size={18} />} 
            label="Settings" 
            isActive={pathname === "/dashboard/settings"}
          />
          <button 
            onClick={handleSignOut}
            className="flex items-center rounded-lg px-3 py-2 text-sm text-dark-200 hover:bg-dark-700 hover:text-dark-50"
          >
            <BiLogOut className="mr-2" size={18} />
            Sign Out
          </button>
        </nav>
      </div>
    </header>
  );
} 