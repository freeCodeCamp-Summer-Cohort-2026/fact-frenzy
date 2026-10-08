"use client";

import { useRouter } from "next/navigation";

export default function Biology() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center font-sans bg-[#2F3E49] w-auto">
      <div className="flex flex-col p-12 gap-6 max-w-4xl">
        <h1 className="text-8xl text-neutral-100 gap-y-4 font-bold text-center">
          Biology
        </h1>
        <section className="flex rounded-2xl bg-slate-100 flex-col gap-8 p-5 h-auto items-center justify-center m-auto border-3 border-black">
          <h2 className="text-6xl font-bold text-center flex-col">Modules</h2>
          <div className="flex flex-row ml-3 space-x-6">
            <section className="flex rounded-2xl flex-col border-3 p-3 gap-4 w-70 border-black">
              <h3 className="text-2xl font-bold text-center text-black">
                Module 1: Human Body
              </h3>
              <button
                className="flex rounded-full bg-[#ea058c] flex-col p-4 text-gray-50 hover:bg-slate-700"
                type="button"
                onClick={() => router.push("/biology/organs-functions-tutorial")}
              >
                Tutorial 1: Organs and Functions
              </button>
              <button
                className="flex rounded-full bg-[#ea058c] flex-col p-4 text-gray-50 hover:bg-slate-700"
                type="button"
                onClick={() => router.push("/biology/organs-systems-tutorial")}
              >
                Tutorial 2: Organs by System
              </button>
              <button
                type="button"
                className="flex rounded-full flex-col bg-slate-800 p-4 text-gray-50 hover:bg-slate-700"
                onClick={() => router.push("/biology/organize-body")}
              >
                Lab: Organize the Human Body
              </button>
            </section>
            <section className="flex rounded-2xl flex-col border-3 p-4 gap-4 w-70 border-black">
              <h3 className="text-2xl font-bold text-center text-black">
                Module 2: Animal Adaptations
              </h3>
              <button
                className="flex rounded-full flex-col bg-[#ea058c] p-4 text-gray-50 hover:bg-slate-700"
                type="button"
                onClick={() => router.push("/biology/animals-tutorial")}
              >
                Tutorial 1: Animals & Habitats
              </button>
              <button
                className="flex rounded-full flex-col bg-[#ea058c] p-4 text-gray-50 hover:bg-slate-700"
                type="button"
                onClick={() => router.push("/biology/adaptations-tutorial")}
              >
                Tutorial 2: Adaptations and Survival
              </button>
              <button
                type="button"
                className="flex rounded-full flex-col bg-slate-800 p-3 text-gray-50 hover:bg-slate-700"
                onClick={() => router.push("/geography/animal-survival")}
              >
                Lab: Animal Survival Challenge
              </button>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
