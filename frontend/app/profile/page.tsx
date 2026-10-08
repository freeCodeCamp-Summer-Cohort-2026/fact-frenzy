"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function handleProfileSubmit(e: FormEvent) {
    e.preventDefault();
    // TODO: send { name, email } to the backend once the endpoint exists
    console.log("Profile update (not yet wired up):", { name, email });
  }

  function handlePasswordSubmit(e: FormEvent) {
    e.preventDefault();
    setPasswordError("");

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords don't match.");
      return;
    }
    // TODO: we can send the password change request to the backend once it exists
    console.log("Password reset (not yet wired up)");
  }

  return (
    <div className="flex flex-1 flex-col items-center bg-[#2F3E49] px-6 py-10 font-sans">
      <div className="flex w-full max-w-lg flex-col gap-8">
        <button
          onClick={() => router.back()}
          className="self-start text-sm font-semibold text-neutral-200 hover:text-white"
        >
          &larr; Back to dashboard
        </button>

        <h1 className="text-center text-3xl font-bold text-neutral-100">
          Account settings
        </h1>

        {/* edit profile */}
        <section className="flex flex-col gap-4 rounded-2xl bg-white/80 p-6">
          <h2 className="text-xl font-bold text-slate-900">
            Profile information
          </h2>
          <div className="flex ">

            <div>


              <div className="flex gap-1">
                <span className="bg-black rounded-full w-10 h-10 text-center pt-2 p-1 text-white">
                  A
                </span>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-black">
                    Teklu  Abayneh
                  </span>
                  <span className="text-[12px] pl-2 text-gray-500">
                    member since Aug 1991
                  </span>
                </div>
              </div>

              {/* we will update them with real value  for now since we are just doing the rough UI */}
              <div className="flex gap-2 m-4">
                {["activities", "Avg Score", "Strike"].map((item, idx) => (
                  <div key={idx} className="w-32 h-16 flex items-center justify-center flex-col bg-white rounded-2xl p-1">
                    <span className="font-bold text-black"> {idx}</span>
                    <span className="text-[14px] pl-2 text-gray-500"> {item} </span>
                  </div>

                ))
                }
              </div>
            </div>

          </div>
          <form onSubmit={handleProfileSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1 text-sm font-semibold text-slate-900">
              Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="rounded-lg border border-slate-300 px-3 py-2 font-normal text-slate-900"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-semibold text-slate-900">
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="rounded-lg border border-slate-300 px-3 py-2 font-normal text-slate-900"
              />
            </label>
            <button
              type="submit"
              className="mt-2 flex h-11 items-center justify-center rounded-full bg-slate-800 px-5 font-semibold text-gray-50 transition-colors hover:bg-slate-700"
            >
              Save changes
            </button>
          </form>
        </section>

        {/* reset password */}
        <section
          id="password"
          className="flex flex-col gap-4 rounded-2xl bg-white/80 p-6"
        >
          <h2 className="text-xl font-bold text-slate-900">Reset password</h2>
          <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1 text-sm font-semibold text-slate-900">
              Current password
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="rounded-lg border border-slate-300 px-3 py-2 font-normal text-slate-900"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-semibold text-slate-900">
              New password
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="rounded-lg border border-slate-300 px-3 py-2 font-normal text-slate-900"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-semibold text-slate-900">
              Confirm new password
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="rounded-lg border border-slate-300 px-3 py-2 font-normal text-slate-900"
              />
            </label>

            {passwordError && (
              <p className="text-sm font-medium text-red-600">
                {passwordError}
              </p>
            )}

            <button
              type="submit"
              className="mt-2 flex h-11 items-center justify-center rounded-full bg-slate-800 px-5 font-semibold text-gray-50 transition-colors hover:bg-slate-700"
            >
              Update password
            </button>
          </form>
        </section>
      </div >
    </div >
  );
}
