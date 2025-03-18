"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { BiShield, BiRefresh, BiEnvelope, BiPalette, BiSave } from "react-icons/bi";
import DashboardHeader from "../components/DashboardHeader";

// Create Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Settings() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [formData, setFormData] = useState({
    emailNotifications: true,
    darkMode: true,
    apiRequestLimit: "1000", // Default
  });

  useEffect(() => {
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      // In a real app, you would fetch user settings from your database
    };

    getUserData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Here you would save the settings to your database
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setSaveSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <>
      <DashboardHeader />
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-dark-50">Settings</h1>
          <p className="mt-2 text-dark-300">
            Manage your account and application settings
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div className="overflow-hidden rounded-2xl border border-accent-600/20 bg-dark-800 p-6">
              <h2 className="mb-4 text-xl font-semibold text-dark-50">Settings</h2>
              
              <nav className="space-y-1">
                <a 
                  href="#account" 
                  className="flex items-center rounded-lg bg-accent-600/10 px-3 py-2 text-sm text-accent-500"
                >
                  <BiShield className="mr-2" size={18} />
                  Account Settings
                </a>
                <a 
                  href="#notifications" 
                  className="flex items-center rounded-lg px-3 py-2 text-sm text-dark-200 hover:bg-dark-700 hover:text-dark-50"
                >
                  <BiEnvelope className="mr-2" size={18} />
                  Notifications
                </a>
                <a 
                  href="#appearance" 
                  className="flex items-center rounded-lg px-3 py-2 text-sm text-dark-200 hover:bg-dark-700 hover:text-dark-50"
                >
                  <BiPalette className="mr-2" size={18} />
                  Appearance
                </a>
              </nav>
            </div>
          </div>

          {/* Settings Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              <div className="space-y-8">
                {/* Account Section */}
                <div className="overflow-hidden rounded-2xl border border-accent-600/20 bg-dark-800 p-6">
                  <h2 id="account" className="mb-4 text-xl font-semibold text-dark-50">Account Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-dark-200" htmlFor="email">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={user.email}
                        disabled
                        className="w-full rounded-lg border border-dark-600 bg-dark-700 px-4 py-2 text-dark-100 opacity-75"
                      />
                    </div>
                    
                    <div>
                      <label className="mb-2 block text-sm font-medium text-dark-200" htmlFor="apiKey">
                        API Key
                      </label>
                      <div className="flex">
                        <input
                          type="password"
                          id="apiKey"
                          value="••••••••••••••••••••••••••"
                          disabled
                          className="w-full rounded-l-lg border border-dark-600 bg-dark-700 px-4 py-2 text-dark-100"
                        />
                        <button
                          type="button"
                          className="inline-flex items-center rounded-r-lg border border-l-0 border-dark-600 bg-dark-600 px-4 py-2 text-sm font-medium text-dark-200 transition-colors hover:bg-dark-500"
                        >
                          <BiRefresh className="mr-2" size={18} />
                          Regenerate
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-dark-400">
                        Your API key provides full access to your account. Keep it secure.
                      </p>
                    </div>
                    
                    <div>
                      <label className="mb-2 block text-sm font-medium text-dark-200" htmlFor="apiRequestLimit">
                        API Request Limit
                      </label>
                      <select
                        id="apiRequestLimit"
                        name="apiRequestLimit"
                        value={formData.apiRequestLimit}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-dark-600 bg-dark-700 px-4 py-2 text-dark-100"
                      >
                        <option value="500">500 requests/day</option>
                        <option value="1000">1,000 requests/day</option>
                        <option value="5000">5,000 requests/day</option>
                        <option value="10000">10,000 requests/day</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Notifications Section */}
                <div className="overflow-hidden rounded-2xl border border-accent-600/20 bg-dark-800 p-6">
                  <h2 id="notifications" className="mb-4 text-xl font-semibold text-dark-50">Notifications</h2>
                  
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="emailNotifications"
                        checked={formData.emailNotifications}
                        onChange={handleInputChange}
                        className="h-4 w-4 rounded border-dark-600 bg-dark-700 text-accent-600"
                      />
                      <span className="ml-2 text-sm text-dark-200">Email notifications</span>
                    </label>
                    <p className="text-xs text-dark-400">
                      Receive email notifications about account updates, usage limits, and new features.
                    </p>
                  </div>
                </div>
                
                {/* Appearance Section */}
                <div className="overflow-hidden rounded-2xl border border-accent-600/20 bg-dark-800 p-6">
                  <h2 id="appearance" className="mb-4 text-xl font-semibold text-dark-50">Appearance</h2>
                  
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="darkMode"
                        checked={formData.darkMode}
                        onChange={handleInputChange}
                        className="h-4 w-4 rounded border-dark-600 bg-dark-700 text-accent-600"
                      />
                      <span className="ml-2 text-sm text-dark-200">Dark mode (always)</span>
                    </label>
                    <p className="text-xs text-dark-400">
                      Enable dark mode across the application regardless of system preferences.
                    </p>
                  </div>
                </div>
                
                {/* Save Button */}
                <div className="flex items-center justify-end space-x-4">
                  {saveSuccess && (
                    <span className="text-sm text-green-500">
                      Settings saved successfully!
                    </span>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium text-dark-50 transition-colors ${
                      loading
                        ? "bg-dark-600 text-dark-300"
                        : "bg-accent-600 hover:bg-accent-700"
                    }`}
                  >
                    {loading ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-dark-300 border-t-dark-100"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <BiSave className="mr-2" size={18} />
                        Save Settings
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
} 