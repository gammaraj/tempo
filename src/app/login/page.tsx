"use client";

import React from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // If already logged in, redirect to the app
  React.useEffect(() => {
    if (!loading && user) {
      router.replace("/app");
    }
  }, [user, loading, router]);

  if (loading || user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-slate-200 dark:border-gray-700 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-[360px]">
        <div className="text-center mb-10">
          <a href="/" className="inline-flex items-center justify-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-neutral-900 dark:bg-neutral-800">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="13" stroke="white" strokeWidth="2.5" strokeOpacity="0.3" fill="none"/>
                <circle cx="16" cy="16" r="13" stroke="white" strokeWidth="2.5" fill="none" strokeDasharray="81.7" strokeDashoffset="20.4" strokeLinecap="round" transform="rotate(-90 16 16)"/>
                <path d="M18 6L12 17h5l-2 10 8-13h-6l3-8z" fill="white"/>
              </svg>
            </div>
          </a>
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white tracking-tight">Tempo</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Focus timer & productivity tracker</p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}
