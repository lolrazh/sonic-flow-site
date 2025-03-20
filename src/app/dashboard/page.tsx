"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { BiCog, BiRightArrowAlt, BiUser, BiSlider } from "react-icons/bi";
import DashboardHeader from "./components/DashboardHeader";
import Image from "next/image";

// Create Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Shadcn-style Switch component
const Switch = ({ checked, onChange, id }: { checked: boolean; onChange: (checked: boolean) => void; id: string }) => {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border border-white/10 transition-colors duration-200 ease-in-out focus:outline-none ${
        checked ? 'bg-white' : 'bg-white/5'
      }`}
    >
      <span className="sr-only">Toggle</span>
      <span
        className={`pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-[rgb(12,12,12)] shadow ring-0 transition duration-200 ease-in-out ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
};

export default function Dashboard() {
  const [user, setUser] = useState<object | null>(null);
  const [userDetails, setUserDetails] = useState<{ name?: string; avatar_url?: string }>({});
  const [trialDaysLeft] = useState(14); // Mock data
  const [isOnTrial] = useState(true); // Mock data
  const [appSettings, setAppSettings] = useState({
    darkMode: true,
    notifications: false,
    autoStart: true,
    autoSave: false,
  });

  useEffect(() => {
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      // Extract user details from Google provider
      if (user) {
        interface UserMetadata {
          full_name?: string;
          name?: string;
          avatar_url?: string;
        }
        
        // Try to get name and avatar from user metadata (OAuth providers store this)
        const metadata = user.user_metadata as UserMetadata | undefined;
        const name = metadata?.full_name ?? metadata?.name;
        const avatarUrl = metadata?.avatar_url;

        setUserDetails({
          name: name ?? (user.email?.split('@')[0]),
          avatar_url: avatarUrl
        });
      }
    };

    void getUserData();
  }, []);

  const handleSettingChange = (setting: string, value: boolean) => {
    setAppSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[rgb(12,12,12)]">
      <DashboardHeader />
      <div className="container mx-auto max-w-7xl px-8 py-16">
        <header className="mb-16">
          <h1 className="font-lexend text-3xl lowercase tracking-tight text-white/90">
            welcome back, <span className="text-white/40">{userDetails.name ?? 'user'}</span>
          </h1>
          <p className="mt-4 font-lexend text-base text-white/40">
            manage your account and settings here
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Basic Information Card */}
          <div className="overflow-hidden rounded-2xl border border-white/5 bg-[rgb(18,18,18)] p-8">
            <h2 className="mb-8 font-lexend text-xl lowercase tracking-tight text-white/90">basic information</h2>
            
            <div className="flex items-center space-x-4 mb-8">
              {userDetails.avatar_url ? (
                <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/10">
                  <Image 
                    src={userDetails.avatar_url} 
                    alt="Profile picture" 
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-white/40">
                  <BiUser size={28} />
                </div>
              )}
              <div>
                <div className="font-lexend text-white/90">{userDetails.name ?? (user && 'email' in user && typeof user.email === 'string' ? user.email.split('@')[0] : 'user')}</div>
                {user && 'email' in user && typeof user.email === 'string' && (
                  <div className="font-lexend text-sm text-white/40">{user.email}</div>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BiUser className="mr-2 text-white/40" size={20} />
                  <span className="font-lexend text-white/60">email</span>
                </div>
                {user && 'email' in user && typeof user.email === 'string' && (
                  <span className="font-lexend text-white/90">{user.email}</span>
                )}
              </div>
            </div>
            
            <button 
              className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 font-lexend text-sm text-white/90 transition-colors hover:bg-white/10"
            >
              <BiCog className="mr-2" size={18} />
              account settings
            </button>
          </div>

          {/* App Settings Card */}
          <div className="overflow-hidden rounded-2xl border border-white/5 bg-[rgb(18,18,18)] p-8">
            <h2 className="mb-8 font-lexend text-xl lowercase tracking-tight text-white/90">app settings</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BiSlider className="mr-2 text-white/40" size={20} />
                  <span className="font-lexend text-white/60">dark mode</span>
                </div>
                <Switch 
                  checked={appSettings.darkMode} 
                  onChange={(checked) => handleSettingChange('darkMode', checked)}
                  id="dark-mode"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BiSlider className="mr-2 text-white/40" size={20} />
                  <span className="font-lexend text-white/60">notifications</span>
                </div>
                <Switch 
                  checked={appSettings.notifications} 
                  onChange={(checked) => handleSettingChange('notifications', checked)}
                  id="notifications"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BiSlider className="mr-2 text-white/40" size={20} />
                  <span className="font-lexend text-white/60">auto-start</span>
                </div>
                <Switch 
                  checked={appSettings.autoStart} 
                  onChange={(checked) => handleSettingChange('autoStart', checked)}
                  id="auto-start"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BiSlider className="mr-2 text-white/40" size={20} />
                  <span className="font-lexend text-white/60">auto-save</span>
                </div>
                <Switch 
                  checked={appSettings.autoSave} 
                  onChange={(checked) => handleSettingChange('autoSave', checked)}
                  id="auto-save"
                />
              </div>
            </div>
          </div>

          {/* Subscription Settings Card */}
          <div className="col-span-1 md:col-span-2 overflow-hidden rounded-2xl border border-white/5 bg-[rgb(18,18,18)] p-8">
            <h2 className="mb-8 font-lexend text-xl lowercase tracking-tight text-white/90">subscription settings</h2>
            
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-4 flex items-center">
                  <span className={`mr-2 inline-block h-2 w-2 rounded-full ${
                    isOnTrial ? "bg-white/40" : "bg-white"
                  }`}></span>
                  <span className="font-lexend text-white/90">
                    {isOnTrial ? "trial period" : "active subscription"}
                  </span>
                </div>
                
                {isOnTrial ? (
                  <p className="font-lexend text-white/40">
                    <span className="text-white/90">{trialDaysLeft} days</span> left in your trial. upgrade to pro for unlimited access.
                  </p>
                ) : (
                  <p className="font-lexend text-white/40">
                    you are currently on the <span className="text-white/90">pro plan</span> with unlimited access.
                  </p>
                )}
              </div>
              
              <button 
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-lexend text-sm text-black/90 transition-colors hover:bg-white/90"
                onClick={() => window.open('https://paddle.com', '_blank')}
              >
                {isOnTrial ? "upgrade plan" : "manage subscription"}
                <BiRightArrowAlt className="ml-1" size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 