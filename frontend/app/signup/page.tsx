"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Target,
  Trophy,
} from "lucide-react";

const benefits = [
  {
    icon: BookOpen,
    title: "Learn something new",
    description: "Explore topics that spark your curiosity.",
  },
  {
    icon: Target,
    title: "Test your knowledge",
    description: "Challenge yourself with interactive quizzes.",
  },
  {
    icon: Trophy,
    title: "Celebrate progress",
    description: "Build your knowledge one challenge at a time.",
  },
];

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);




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

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (!acceptedTerms) {
            setError("You must accept the terms");
            return;
        }

        setLoading(true);

        try {
            // Replace with your actual signup API request.
            throw new Error("Signup API is not connected yet.");
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

          {/* Left panel */}
          <section className="relative hidden overflow-hidden bg-[#A60362] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-12">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-black/10 blur-3xl" />

            <div className="relative">

                <h1 className="mt-7 text-4xl font-bold leading-tight xl:text-5xl">
                  Your next big discovery starts here.
                </h1>

                <p className="mt-5 max-w-md text-base leading-8 text-pink-100">
                  Join Fact Frenzy and discover a more engaging
                  way to learn, explore interesting facts, and
                  put your knowledge to the test.
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

          {/* Signup form */}
          <section className="px-5 py-8 sm:px-10 sm:py-12 lg:px-10 xl:px-12">
            {/* Mobile logo */}

            <div className="mb-8">


              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Create your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
                Join the community and start exploring today.
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
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Full name
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>


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

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                    className={`${inputClass} pr-12`}
                    required
                    minLength={8}
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

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Confirm password
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={
                      showConfirmPassword ? "text" : "password"
                    }
                    autoComplete="new-password"
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`${inputClass} pr-12`}
                    required
                    minLength={8}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((prev) => !prev)
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:text-[#A60362]"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) =>
                    setAcceptedTerms(e.target.checked)
                  }
                  className="mt-1 h-4 w-4 shrink-0 accent-[#A60362]"
                />

                <span className="text-sm leading-6 text-slate-500">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="font-semibold text-[#A60362] hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="font-semibold text-[#A60362] hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

                <button
                type="submit"
                disabled={loading}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#A60362] px-5 font-semibold text-white transition hover:bg-[#8D0354] disabled:cursor-not-allowed disabled:opacity-70"
                >
                {loading ? "Creating account..." : "Create account"}
                </button>
            </form>

            <div className="relative my-7">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>

              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm text-slate-400">
                  Already part of the community?
                </span>
              </div>
            </div>

            <p className="text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-[#A60362] transition hover:text-[#8c0253] hover:underline"
              >
                Log in
              </Link>
            </p>

            <p className="mt-8 text-center text-xs leading-5 text-slate-400">
              By joining Fact Frenzy, you're taking the first
              step toward discovering something new every day.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

