"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lightbulb,
  Loader2,
  BookOpen,
  Target,
  Trophy,
} from "lucide-react";

const benefits = [
  {
    icon: BookOpen,
    title: "Keep learning",
    description: "Pick up where you left off and explore new topics.",
  },
  {
    icon: Target,
    title: "Challenge yourself",
    description: "Test your knowledge with interactive quizzes.",
  },
  {
    icon: Trophy,
    title: "Track your progress",
    description: "Celebrate every new thing you discover.",
  },
];

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Connect your login API here.
      //
      // const response = await fetch("/api/auth/login/", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     email: formData.email,
      //     password: formData.password,
      //     remember_me: rememberMe,
      //   }),
      // });
      //
      // const data = await response.json();
      //
      // if (!response.ok) {
      //   throw new Error(
      //     data.detail || "Invalid email or password."
      //   );
      // }
      //
      // router.push("/try");

      setError(
        "Login API is not connected yet. Connect your backend to sign in."
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#A60362] focus:ring-4 focus:ring-[#A60362]/10";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 lg:grid-cols-2">

          {/* Left branding panel */}
          <section className="relative hidden overflow-hidden bg-[#A60362] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-12">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-black/10 blur-3xl" />

            <div className="relative">
              


                <h1 className="mt-7 text-4xl font-bold leading-tight xl:text-5xl">
                  Welcome back to your learning journey.
                </h1>

                <p className="mt-5 max-w-md text-base leading-8 text-pink-100">
                  Your next discovery is just around the corner.
                  Sign in to explore interesting facts, learn new
                  concepts, and challenge what you know.
                </p>
            </div>

            <div className="relative mt-12 space-y-6">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <div
                    key={benefit.title}
                    className="flex items-start gap-4"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <Icon size={21} />
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        {benefit.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-pink-100">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}

              <p className="border-t border-white/20 pt-6 text-sm text-pink-100">
                Turn curiosity into knowledge.
              </p>
            </div>
          </section>

          {/* Login form */}
          <section className="flex flex-col justify-center px-5 py-10 sm:px-10 sm:py-12 lg:px-10 xl:px-12">
            {/* Mobile logo */}


            <div className="mb-8">

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Log in to your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
                Enter your details to continue your learning journey.
              </p>
            </div>

            {error && (
              <div
                role="alert"
                className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700"
              >
                <span className="font-semibold">!</span>
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-sm font-semibold text-[#A60362] transition hover:text-[#8c0253] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`${inputClass} pr-12`}
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:text-[#A60362]"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(e.target.checked)
                  }
                  className="h-4 w-4 rounded accent-[#A60362]"
                />

                <span className="text-sm text-slate-600">
                  Remember me
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#A60362] px-5 font-semibold text-white shadow-lg shadow-[#A60362]/20 transition-all hover:bg-[#8c0253] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Log in
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>

              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm text-slate-400">
                  New to Fact Frenzy?
                </span>
              </div>
            </div>

            <Link
              href="/signup"
              className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-5 font-semibold text-slate-700 transition hover:border-[#A60362]/40 hover:bg-[#A60362]/5 hover:text-[#A60362]"
            >
              Create an account
            </Link>

            <p className="mt-8 text-center text-xs leading-5 text-slate-400">
              Turn curiosity into knowledge. One discovery at a time.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
