"use client";
import { FlaskConical, BookOpen, DoorClosedPackage, DatabaseZap } from "lucide-react";
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

// we will remove this testing data when we wire with the backend
const activity = [
  { icon: FlaskConical, title: "Networking Lab 2", meta: "Lab · today", result: "94%", tone: "text-emerald-600" },
  { icon: BookOpen, title: "Intro to Containers", meta: "Tutorial · yesterday", result: "Completed", tone: "text-slate-900" },
  { icon: DoorClosedPackage, title: "Module 5: Storage", meta: "Module · 2 days ago", result: "88%", tone: "text-emerald-600" },
  { icon: DatabaseZap, title: "Daily Challenge", meta: "Challenge · 3 days ago", result: "65%", tone: "text-amber-600" },
]

const completion = [
  { label: "Modules", done: 6, total: 9 },
  { label: "Tutorials", done: 14, total: 20 },
  { label: "Labs", done: 8, total: 12 },
];
const scores = [72, 78, 65, 88, 81, 94, 90];
const stats = [
  { label: "Overall", value: "68%", note: "▲ 6% this week" },
  { label: "Avg score", value: "82%", note: "▲ 3 pts" },
  { label: "Activities", value: "34", note: "5 this week" },
  { label: "Time learning", value: "12h 40m", note: "Best: Tuesday" },
];



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
          <div className="flex  gap-3">
            <button
              onClick={handleSignOut}
              className="flex h-10 items-center cursor-pointer justify-center rounded-full bg-slate-800 px-5 text-sm font-semibold text-gray-50 transition-colors hover:bg-slate-700"
            >
              Dashboard
            </button>
            <button
              onClick={() => router.push("/profile")}
              className="flex h-10 items-center justify-center cursor-pointer rounded-full bg-slate-800 px-5 text-sm font-semibold text-gray-50 transition-colors hover:bg-slate-700"
            >
              Account Setting
            </button>
          </div>


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
            className="flex h-12 w-full items-center justify-center rounded-full bg-slate-800 px-8 text-lg font-bold text-gray-50 transition-colors hover:bg-slate-700 sm:w-auto"
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


        <section className="rounded-2xl bg-white/70 p-5 backdrop-blur-md">
          <h3 className="mb-3 text-base font-semibold text-slate-900">Your progress</h3>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl bg-white/50 p-3">
                <p className="text-xs font-semibold text-slate-500">{s.label}</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">{s.value}</p>
                <p className="text-xs font-semibold text-emerald-600">{s.note}</p>
              </div>
            ))}
          </div>
        </section>


        <div className="grid gap-4 md:grid-cols-2">
          <section className="rounded-2xl bg-white/70 p-5 backdrop-blur-md">
            <h3 className="mb-3 text-base font-semibold text-slate-900">Completion</h3>
            <div className="space-y-4">
              {completion.map((c) => {
                const pct = Math.round((c.done / c.total) * 100);
                return (
                  <div key={c.label}>
                    <div className="mb-1 flex justify-between text-sm font-semibold text-slate-900">
                      <span>{c.label}</span>
                      <span>{c.done} / {c.total}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-900/15">
                      <div className="h-full rounded-full bg-slate-900" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-2xl bg-white/70 p-5 backdrop-blur-md">
            <h3 className="mb-3 text-base font-semibold text-slate-900">Recent scores</h3>
            <div className="flex h-32 items-end gap-2">
              {scores.map((s, i) => (
                <div key={i} className="flex h-full flex-1 flex-col items-center justify-end text-[11px] text-slate-500">
                  <div
                    className="mb-1 w-full rounded-t-md bg-gradient-to-b from-indigo-600 to-slate-900"
                    style={{ height: `${s}%` }}
                  />
                  {s}
                </div>
              ))}
            </div>
          </section>


        </div>


        <section className="rounded-2xl bg-white/70 p-5 backdrop-blur-md">
          <h3 className="mb-3 text-base font-semibold text-slate-900">Recent activity</h3>
          <ul className="divide-y divide-slate-900/10">
            {activity.map((a) => (
              <li key={a.title} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/50"><a.icon /></span>
                <div className="text-sm text-slate-900">
                  {a.title}
                  <p className="text-xs text-slate-500">{a.meta}</p>
                </div>
                <span className={`ml-auto text-sm font-bold ${a.tone}`}>{a.result}</span>
              </li>
            ))}
          </ul>
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
