"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { BiCog, BiRightArrowAlt, BiUser, BiSlider } from "react-icons/bi";
import DashboardHeader from "./components/DashboardHeader";
import Image from "next/image";

// Create Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
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
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent-600 focus:ring-offset-2 ${
        checked ? 'bg-accent-600' : 'bg-dark-600'
      }`}
    >
      <span className="sr-only">Toggle</span>
      <span
        className={`pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-dark-50 shadow ring-0 transition duration-200 ease-in-out ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
};

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [userDetails, setUserDetails] = useState<{ name?: string; avatar_url?: string }>({});
  const [trialDaysLeft, setTrialDaysLeft] = useState(14); // Mock data
  const [isOnTrial, setIsOnTrial] = useState(true); // Mock data
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
        // Try to get name and avatar from user metadata (OAuth providers store this)
        const name = user.user_metadata?.full_name || user.user_metadata?.name;
        const avatarUrl = user.user_metadata?.avatar_url;

        setUserDetails({
          name: name || user.email?.split('@')[0],
          avatar_url: avatarUrl
        });
      }
    };

    getUserData();
  }, []);

  const handleSettingChange = (setting: string, value: boolean) => {
    setAppSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  if (!user) return null;

  return (
    <>
      <DashboardHeader />
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-dark-50">
            Welcome to Sonic Flow, <span className="text-accent-500">{userDetails.name || 'User'}</span>
          </h1>
          <p className="mt-2 text-dark-300">
            Manage your account and settings here
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Basic Information Card */}
          <div className="overflow-hidden rounded-2xl border border-accent-600/20 bg-dark-800 p-6">
            <h2 className="mb-4 text-xl font-semibold text-dark-50">Basic Information</h2>
            
            <div className="flex items-center space-x-4 mb-4">
              {userDetails.avatar_url ? (
                <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-accent-600/30">
                  <Image 
                    src={userDetails.avatar_url} 
                    alt="Profile picture" 
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-600/20 text-accent-500">
                  <BiUser size={28} />
                </div>
              )}
              <div>
                <div className="font-medium text-dark-100">{userDetails.name || user.email?.split('@')[0]}</div>
                <div className="text-sm text-dark-300">{user.email}</div>
              </div>
            </div>
            
            <div className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BiUser className="mr-2 text-accent-500" size={20} />
                  <span className="text-dark-200">Email</span>
                </div>
                <span className="font-medium text-dark-100">{user.email}</span>
              </div>
            </div>
            
            <button 
              className="mt-4 inline-flex w-full items-center justify-center rounded-lg border border-dark-600 bg-dark-700 px-4 py-2 text-sm font-medium text-dark-100 transition-colors hover:bg-dark-600"
            >
              <BiCog className="mr-2" size={18} />
              Account Settings
            </button>
          </div>

          {/* App Settings Card */}
          <div className="overflow-hidden rounded-2xl border border-accent-600/20 bg-dark-800 p-6">
            <h2 className="mb-4 text-xl font-semibold text-dark-50">App Settings</h2>
            
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BiSlider className="mr-2 text-accent-500" size={20} />
                  <span className="text-dark-200">Dark Mode</span>
                </div>
                <Switch 
                  checked={appSettings.darkMode} 
                  onChange={(checked) => handleSettingChange('darkMode', checked)}
                  id="dark-mode"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BiSlider className="mr-2 text-accent-500" size={20} />
                  <span className="text-dark-200">Notifications</span>
                </div>
                <Switch 
                  checked={appSettings.notifications} 
                  onChange={(checked) => handleSettingChange('notifications', checked)}
                  id="notifications"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BiSlider className="mr-2 text-accent-500" size={20} />
                  <span className="text-dark-200">Auto-start</span>
                </div>
                <Switch 
                  checked={appSettings.autoStart} 
                  onChange={(checked) => handleSettingChange('autoStart', checked)}
                  id="auto-start"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BiSlider className="mr-2 text-accent-500" size={20} />
                  <span className="text-dark-200">Auto-save</span>
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
          <div className="col-span-1 md:col-span-2 overflow-hidden rounded-2xl border border-accent-600/20 bg-dark-800 p-6">
            <h2 className="mb-4 text-xl font-semibold text-dark-50">Subscription Settings</h2>
            
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-2 flex items-center">
                  <span className={`mr-2 inline-block h-3 w-3 rounded-full ${
                    isOnTrial ? "bg-yellow-500" : "bg-green-500"
                  }`}></span>
                  <span className="font-medium text-dark-100">
                    {isOnTrial ? "Trial Period" : "Active Subscription"}
                  </span>
                </div>
                
                {isOnTrial ? (
                  <p className="text-dark-300">
                    <span className="font-medium text-accent-400">{trialDaysLeft} days</span> left in your trial. Upgrade to Pro for unlimited access.
                  </p>
                ) : (
                  <p className="text-dark-300">
                    You are currently on the <span className="font-medium text-accent-400">Pro Plan</span> with unlimited access.
                  </p>
                )}
              </div>
              
              <button 
                className="inline-flex items-center justify-center rounded-lg bg-accent-600 px-4 py-2 text-sm font-medium text-dark-50 transition-colors hover:bg-accent-700"
                onClick={() => window.open('https://paddle.com', '_blank')}
              >
                {isOnTrial ? "Upgrade Plan" : "Manage Subscription"}
                <BiRightArrowAlt className="ml-1" size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 