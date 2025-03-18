"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { BiCog, BiRightArrowAlt, BiUser } from "react-icons/bi";
import { HiOutlineChartBar, HiOutlineClock } from "react-icons/hi";
import DashboardHeader from "./components/DashboardHeader";

// Create Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [trialDaysLeft, setTrialDaysLeft] = useState(14); // Mock data
  const [isOnTrial, setIsOnTrial] = useState(true); // Mock data
  const [subscriptionStatus, setSubscriptionStatus] = useState("trial"); // Mock data: "trial", "active", "inactive"
  const [usageStats, setUsageStats] = useState({
    totalQueries: 156,
    avgResponseTime: "1.2s",
  }); // Mock data

  useEffect(() => {
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      // In real implementation, fetch subscription data from your backend
      // that connects with Paddle API
    };

    getUserData();
  }, []);

  if (!user) return null;

  return (
    <>
      <DashboardHeader />
      <div className="container mx-auto max-w-6xl px-4 py-12">
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-dark-50">
            Welcome to Sonic Flow, <span className="text-accent-500">{user.email?.split('@')[0] || 'User'}</span>
          </h1>
          <p className="mt-2 text-dark-300">
            Manage your account and settings here
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Subscription Status Card */}
          <div className="col-span-1 overflow-hidden rounded-2xl border border-accent-600/20 bg-dark-800 p-6 lg:col-span-2">
            <h2 className="mb-4 text-xl font-semibold text-dark-50">Subscription Status</h2>
            
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-2 flex items-center">
                  <span className={`mr-2 inline-block h-3 w-3 rounded-full ${
                    subscriptionStatus === "active" ? "bg-green-500" : 
                    subscriptionStatus === "trial" ? "bg-yellow-500" : "bg-red-500"
                  }`}></span>
                  <span className="font-medium text-dark-100">
                    {subscriptionStatus === "active" ? "Active Subscription" : 
                     subscriptionStatus === "trial" ? "Trial Period" : "Inactive"}
                  </span>
                </div>
                
                {isOnTrial && (
                  <p className="text-dark-300">
                    <span className="font-medium text-accent-400">{trialDaysLeft} days</span> left in your trial
                  </p>
                )}
              </div>
              
              <button 
                className="inline-flex items-center justify-center rounded-lg bg-accent-600 px-4 py-2 text-sm font-medium text-dark-50 transition-colors hover:bg-accent-700"
                onClick={() => window.open('https://paddle.com', '_blank')}
              >
                Manage Subscription
                <BiRightArrowAlt className="ml-1" size={18} />
              </button>
            </div>
          </div>

          {/* Usage Stats Card */}
          <div className="overflow-hidden rounded-2xl border border-accent-600/20 bg-dark-800 p-6">
            <h2 className="mb-4 text-xl font-semibold text-dark-50">Usage Stats</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <HiOutlineChartBar className="mr-2 text-accent-500" size={20} />
                  <span className="text-dark-200">Total Queries</span>
                </div>
                <span className="font-medium text-dark-100">{usageStats.totalQueries}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <HiOutlineClock className="mr-2 text-accent-500" size={20} />
                  <span className="text-dark-200">Avg Response Time</span>
                </div>
                <span className="font-medium text-dark-100">{usageStats.avgResponseTime}</span>
              </div>
            </div>
          </div>

          {/* Account Settings Card */}
          <div className="overflow-hidden rounded-2xl border border-accent-600/20 bg-dark-800 p-6">
            <h2 className="mb-4 text-xl font-semibold text-dark-50">Account</h2>
            
            <div className="space-y-4">
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
              Manage Account Settings
            </button>
          </div>

          {/* App Settings Card */}
          <div className="col-span-1 overflow-hidden rounded-2xl border border-accent-600/20 bg-dark-800 p-6 lg:col-span-2">
            <h2 className="mb-4 text-xl font-semibold text-dark-50">App Settings</h2>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-dark-600 bg-dark-700 p-4">
                <h3 className="mb-2 font-medium text-dark-100">API Key</h3>
                <div className="flex items-center">
                  <input 
                    type="password" 
                    value="••••••••••••••••" 
                    disabled
                    className="w-full rounded-md border border-dark-600 bg-dark-800 px-3 py-2 text-dark-200"
                  />
                  <button className="ml-2 rounded-md bg-dark-600 px-3 py-2 text-sm text-dark-200 hover:bg-dark-500">
                    Show
                  </button>
                </div>
                <button className="mt-2 text-sm text-accent-500 hover:text-accent-400">
                  Regenerate API Key
                </button>
              </div>
              
              <div className="rounded-lg border border-dark-600 bg-dark-700 p-4">
                <h3 className="mb-2 font-medium text-dark-100">Preferences</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 h-4 w-4 rounded border-dark-600 bg-dark-800 text-accent-600" />
                    <span className="text-sm text-dark-200">Email notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 h-4 w-4 rounded border-dark-600 bg-dark-800 text-accent-600" />
                    <span className="text-sm text-dark-200">Dark mode (always)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 