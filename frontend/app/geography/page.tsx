"use client";

import { useRouter } from "next/navigation";

export default function Geography() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center font-sans bg-[#2F3E49] w-auto">
      <div className="flex flex-col p-12 gap-6 max-w-4xl">
        <h1 className="text-8xl text-neutral-100 gap-y-4 font-bold text-center">
          Geography
        </h1>
        <section className="flex rounded-2xl bg-slate-100 flex-col gap-8 p-5 h-auto items-center justify-center m-auto border-3 border-black">
          <h2 className="text-6xl font-bold text-center flex-col text-black">Modules</h2>
          <div className="flex flex-row space-x-6">
            <section className="flex rounded-2xl flex-col border-3 p-3 gap-5 w-70 border-black">
              <h3 className="text-2xl font-bold text-center text-black">
                Module 1: Countries & Capitals
              </h3>
              <button
                type="button"
                className="flex rounded-full bg-[#ea058c] flex-col p-4 text-gray-50 hover:bg-slate-700"
                onClick={() => router.push("/geography/countries-tutorial")}
              >
                Tutorial 1: Country Highlight
              </button>
              <button
                type="button"
                className="flex rounded-full flex-col bg-[#ea058c] p-4 text-gray-50 hover:bg-slate-700"
                onClick={() => router.push("/geography/capitals-tutorial")}
              >
                Tutorial 2: Match Capitals
              </button>
              <button
                type="button"
                className="flex rounded-full flex-col bg-slate-800 p-4 text-gray-50 hover:bg-slate-700"
                onClick={() => router.push("/geography/country-challenge")}
              >
                Lab: Country Challenge
              </button>
            </section>
            <section className="flex rounded-2xl flex-col border-3 p-3 gap-4 w-70 border-black">
              <h3 className="text-2xl font-bold text-center text-black">
                Module 2: Continents
              </h3>
              <button
                type="button"
                className="flex rounded-full flex-col bg-[#ea058c] p-4 text-gray-50 hover:bg-slate-700"
                onClick={() => router.push("/geography/where-tutorial")}
              >
                Tutorial 1: What Belongs Where?
              </button>
              <button
                type="button"
                className="flex rounded-full flex-col bg-[#ea058c] p-4 text-gray-50 hover:bg-slate-700"
                onClick={() => router.push("/geography/contintents-tutorial")}
              >
                Tutorial 2: Continent Extremes
              </button>
              <button
                type="button"
                className="flex rounded-full flex-col bg-slate-800 p-4 text-gray-50 hover:bg-slate-700"
                onClick={() => router.push("/geography/world-explorer")}
              >
                Lab: World Explorer
              </button>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
