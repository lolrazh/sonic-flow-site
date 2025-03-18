"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { 
  BiCalendar, 
  BiDownload, 
  BiTime,
  BiCheckCircle, 
  BiXCircle,
  BiInfoCircle
} from "react-icons/bi";
import DashboardHeader from "../components/DashboardHeader";

// Create Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Mock data for usage statistics
const mockUsageData = {
  totalQueries: 156,
  averageResponseTime: "1.2s",
  successRate: 98,
  dailyLimit: 1000,
  recentQueries: [
    { id: 1, query: "What's the latest update on our sales report?", timestamp: "2023-05-15T14:32:00Z", status: "success", responseTime: "1.1s" },
    { id: 2, query: "Can you summarize the meeting notes from yesterday?", timestamp: "2023-05-15T12:17:00Z", status: "success", responseTime: "0.9s" },
    { id: 3, query: "Draft an email to the marketing team about the new campaign", timestamp: "2023-05-15T10:45:00Z", status: "success", responseTime: "1.4s" },
    { id: 4, query: "What were our Q1 metrics compared to Q2?", timestamp: "2023-05-14T16:22:00Z", status: "error", responseTime: "2.3s" },
    { id: 5, query: "Schedule a meeting with the development team for next Tuesday", timestamp: "2023-05-14T11:05:00Z", status: "success", responseTime: "1.0s" },
  ],
  usageByDay: [
    { date: "May 15", queries: 42 },
    { date: "May 14", queries: 38 },
    { date: "May 13", queries: 51 },
    { date: "May 12", queries: 25 },
    { date: "May 11", queries: 0 },
    { date: "May 10", queries: 0 },
    { date: "May 9", queries: 0 },
  ]
};

export default function Usage() {
  const [user, setUser] = useState<any>(null);
  const [usageData, setUsageData] = useState(mockUsageData);
  const [timeRange, setTimeRange] = useState("7days");

  useEffect(() => {
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      // In a real app, you would fetch usage data from your backend
      // based on the selected time range
    };

    getUserData();
  }, []);

  // Function to format timestamp to a readable format
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  if (!user) return null;

  return (
    <>
      <DashboardHeader />
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-dark-50">Usage Statistics</h1>
          <p className="mt-2 text-dark-300">
            Monitor your API usage and performance metrics
          </p>
        </header>

        {/* Time Range Selector */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <BiCalendar className="text-dark-300" size={20} />
            <span className="text-sm font-medium text-dark-200">Time Range:</span>
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="rounded-md border border-dark-600 bg-dark-700 px-3 py-1 text-sm text-dark-100"
            >
              <option value="24hours">Last 24 Hours</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
            </select>
          </div>
          
          <button className="inline-flex items-center rounded-lg border border-dark-600 bg-dark-700 px-3 py-1 text-sm font-medium text-dark-200 transition-colors hover:bg-dark-600">
            <BiDownload className="mr-2" size={16} />
            Export Data
          </button>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="overflow-hidden rounded-2xl border border-accent-600/20 bg-dark-800 p-6">
            <div className="mb-2 text-sm font-medium text-dark-300">Total Queries</div>
            <div className="text-2xl font-bold text-dark-50">{usageData.totalQueries}</div>
            <div className="mt-2 text-xs text-dark-400">
              <span className="font-medium text-green-500">
                {Math.round((usageData.totalQueries / usageData.dailyLimit) * 100)}%
              </span> of daily limit
            </div>
          </div>
          
          <div className="overflow-hidden rounded-2xl border border-accent-600/20 bg-dark-800 p-6">
            <div className="mb-2 text-sm font-medium text-dark-300">Avg Response Time</div>
            <div className="text-2xl font-bold text-dark-50">{usageData.averageResponseTime}</div>
            <div className="mt-2 text-xs text-green-500">
              <BiTime className="mr-1 inline" size={12} />
              Faster than 85% of users
            </div>
          </div>
          
          <div className="overflow-hidden rounded-2xl border border-accent-600/20 bg-dark-800 p-6">
            <div className="mb-2 text-sm font-medium text-dark-300">Success Rate</div>
            <div className="text-2xl font-bold text-dark-50">{usageData.successRate}%</div>
            <div className="mt-2 text-xs text-green-500">
              <BiCheckCircle className="mr-1 inline" size={12} />
              2% higher than average
            </div>
          </div>
          
          <div className="overflow-hidden rounded-2xl border border-accent-600/20 bg-dark-800 p-6">
            <div className="mb-2 text-sm font-medium text-dark-300">Daily Limit</div>
            <div className="text-2xl font-bold text-dark-50">{usageData.dailyLimit}</div>
            <div className="mt-2 text-xs text-accent-500">
              <BiInfoCircle className="mr-1 inline" size={12} />
              <a href="/dashboard/settings" className="hover:underline">Upgrade for more</a>
            </div>
          </div>
        </div>

        {/* Usage Graph (Simplified with a table) */}
        <div className="mb-8 overflow-hidden rounded-2xl border border-accent-600/20 bg-dark-800 p-6">
          <h2 className="mb-4 text-xl font-semibold text-dark-50">Usage Over Time</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-700">
                  <th className="pb-3 text-left text-sm font-medium text-dark-300">Date</th>
                  <th className="pb-3 text-left text-sm font-medium text-dark-300">Queries</th>
                  <th className="pb-3 text-right text-sm font-medium text-dark-300">Usage</th>
                </tr>
              </thead>
              <tbody>
                {usageData.usageByDay.map((day, index) => (
                  <tr key={index} className="border-b border-dark-700/50">
                    <td className="py-3 text-sm text-dark-200">{day.date}</td>
                    <td className="py-3 text-sm font-medium text-dark-100">{day.queries}</td>
                    <td className="py-3 text-right">
                      <div className="inline-flex w-32 items-center">
                        <div className="relative h-2 w-full rounded-full bg-dark-700">
                          <div 
                            className="absolute left-0 top-0 h-2 rounded-full bg-accent-600" 
                            style={{ width: `${(day.queries / usageData.dailyLimit) * 100}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-xs text-dark-300">
                          {Math.round((day.queries / usageData.dailyLimit) * 100)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Queries */}
        <div className="overflow-hidden rounded-2xl border border-accent-600/20 bg-dark-800 p-6">
          <h2 className="mb-4 text-xl font-semibold text-dark-50">Recent Queries</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-700">
                  <th className="pb-3 text-left text-sm font-medium text-dark-300">Query</th>
                  <th className="pb-3 text-left text-sm font-medium text-dark-300">Time</th>
                  <th className="pb-3 text-left text-sm font-medium text-dark-300">Status</th>
                  <th className="pb-3 text-right text-sm font-medium text-dark-300">Response Time</th>
                </tr>
              </thead>
              <tbody>
                {usageData.recentQueries.map((query) => (
                  <tr key={query.id} className="border-b border-dark-700/50">
                    <td className="max-w-xs truncate py-4 text-sm text-dark-200">
                      {query.query}
                    </td>
                    <td className="py-4 text-sm text-dark-300">
                      {formatTimestamp(query.timestamp)}
                    </td>
                    <td className="py-4">
                      {query.status === "success" ? (
                        <span className="inline-flex items-center text-sm text-green-500">
                          <BiCheckCircle className="mr-1" size={16} />
                          Success
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-sm text-red-500">
                          <BiXCircle className="mr-1" size={16} />
                          Error
                        </span>
                      )}
                    </td>
                    <td className="py-4 text-right text-sm font-medium text-dark-100">
                      {query.responseTime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
} 