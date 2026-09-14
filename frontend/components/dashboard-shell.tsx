"use client";

import { useRouter } from "next/navigation";
import StreakBadge from "@/components/streak-badge";

//TODO:
/*
- swap the hardcoded `user` prop dashboard/page.tsx and
  /dashboard/creator for real session/auth data once login
  is wired up
- actually clear the session/token on sign-out once auth exists; 
*/

type DashboardUser = {
  name: string;
  streak: number;
};

type DashboardShellProps = {
  user: DashboardUser;
  role: "user" | "creator";
};

export default function DashboardShell({ user, role }: DashboardShellProps) {
  const router = useRouter();

  function handleSignOut() {
    // TODO: clear session/token here once auth is wired up
    router.push("/");
  }

  return (
    <div className="flex flex-1 flex-col items-center bg-[#2F3E49] px-6 py-10 font-sans">
      <div className="flex w-full max-w-4xl flex-col gap-8">
        {/* streak + sign out */}
        <div className="flex items-center justify-between gap-3">
          <StreakBadge streak={user.streak} />
          <button
            onClick={handleSignOut}
            className="flex h-10 items-center justify-center rounded-full bg-slate-800 px-5 text-sm font-semibold text-gray-50 transition-colors hover:bg-slate-700"
          >
            Sign out
          </button>
        </div>

        {/* welcome header */}
        <div className="text-center text-neutral-100">
          <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
          <p className="mt-1 text-neutral-300">
            {role === "creator" ? "Creator dashboard" : "Your dashboard"}
          </p>
        </div>

        {/* game mode buttons */}
        <section className="flex flex-col items-center gap-4 rounded-2xl bg-white/80 p-6 sm:flex-row sm:justify-center">
          <button
            onClick={() => router.push("/practice")}
            className="flex h-12 w-full items-center justify-center rounded-full bg-[#C3CED6] px-8 text-lg font-bold text-slate-900 transition-colors hover:bg-slate-200 sm:w-auto"
          >
            Practice
          </button>
          <button
            onClick={() => router.push("/challenge")}
            className="flex h-12 w-full items-center justify-center rounded-full bg-slate-800 px-8 text-lg font-bold text-gray-50 transition-colors hover:bg-slate-700 sm:w-auto"
          >
            Challenge
          </button>
        </section>

        {/* creator-only tools */}
        {role === "creator" && (
          <section className="flex flex-col gap-4 rounded-2xl bg-white/80 p-6">
            <h2 className="text-xl font-bold text-slate-900">Creator tools</h2>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => router.push("/creator/quizzes/new")}
                className="flex h-11 flex-1 items-center justify-center rounded-full bg-slate-800 px-5 font-semibold text-gray-50 transition-colors hover:bg-slate-700"
              >
                Create a quiz
              </button>
              <button
                onClick={() => router.push("/creator/questions")}
                className="flex h-11 flex-1 items-center justify-center rounded-full bg-slate-800 px-5 font-semibold text-gray-50 transition-colors hover:bg-slate-700"
              >
                Manage question bank
              </button>
            </div>
          </section>
        )}

        {/* account settings */}
        <section className="flex flex-col gap-3 rounded-2xl bg-white/80 p-6 sm:flex-row sm:justify-center">
          <button
            onClick={() => router.push("/profile")}
            className="flex h-11 w-full items-center justify-center rounded-full border-2 border-slate-800 px-5 font-semibold text-slate-900 transition-colors hover:bg-slate-100 sm:w-auto"
          >
            Edit profile
          </button>
          <button
            onClick={() => router.push("/profile#password")}
            className="flex h-11 w-full items-center justify-center rounded-full border-2 border-slate-800 px-5 font-semibold text-slate-900 transition-colors hover:bg-slate-100 sm:w-auto"
          >
            Reset password
          </button>
        </section>
      </div>
    </div>
  );
}
