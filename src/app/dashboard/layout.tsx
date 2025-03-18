"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "~/components/ui";
import { useSession } from "~/lib/auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, user, error } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      console.log("No authenticated user found, redirecting to login");
      router.push('/login');
    }
  }, [loading, user, router]);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-dark-900 p-4 text-center">
        <div className="rounded-lg bg-red-900/20 p-6 text-red-400">
          <h2 className="mb-2 text-xl font-semibold">Authentication Error</h2>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  // Only render children if user is authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-dark-900 text-dark-50">
      {children}
    </div>
  );
} 