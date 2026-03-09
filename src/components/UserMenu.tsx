"use client";

import { useAuth } from "./AuthProvider";

export default function UserMenu() {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-neutral-500 dark:text-neutral-300 truncate max-w-[140px] hidden sm:inline">
        {user.email}
      </span>
      <button
        onClick={signOut}
        className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors px-2 py-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
      >
        Sign out
      </button>
    </div>
  );
}
