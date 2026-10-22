import MatchingExercise from "@/components/MatchingExercise";
import SortingExercise from "@/components/SortingExercise";
import { bodySystemPairs, bodySorting } from "./data";

export default function LabPage() {
    return (
            <main className="bg-slate-50 dark:bg-[#0a0a0a] min-h-screen w-full max-w-6xl mx-auto px-4 py-8 flex flex-col gap-4">
                <h1 className="mt-4 text-3xl font-extrabold text-center text-[#A60362] dark:text-[#CB3A8E] mb-2 sm:text-4xl">
                    Biology Lab:{" "}
                    <span className="text-slate-900 dark:text-slate-200">
                        Organize the Human Body
                    </span>
                </h1>

                {/* Instructions section */}
                <section className="mx-auto p-4 text-center sm:px-6">
                    <p className="text-xl leading-7 font-semibold text-slate-700 dark:text-slate-200 sm:text-2xl">
                        Complete all activities correctly to earn points towards your weekly
                        leaderboard score!
                    </p>
                    <p className="text-lg mt-8 font-bold uppercase tracking-wide text-[#A60362] dark:text-[#CB3A8E] sm:text-xl">
                        Instructions and scoring
                    </p>
                    <div className="text-slate-700 dark:text-slate-200">
                        <p className="mt-3 text-lg sm:text-xl">
                            In the activities below, drag boxes onto their correct answers.
                            See the bottom of the page for your scores.
                        </p>
                        <div className="mt-5 text-left text-lg sm:text-xl">
                            <p>
                                <strong>Lab score:</strong> Each correct earns 10
                                lab points. But if you get any answers wrong, then you
                                lose 10 lab points.{" "}
                            </p>
                            <p className="mt-3">
                                <strong>Leaderboard score:</strong> Your total lab points
                                after the lab is complete are added to your weekly leaderboard
                                score (or deducted from that score, if the total lab
                                points are negative).
                            </p>
                        </div>
                    </div>
                </section>
                <hr className="border-t border-slate-400 dark:border-slate-900 my-2 max-w-xl w-full mx-auto" />

                <section className="mx-auto w-full max-w-4xl">
                    <MatchingExercise
                        questions={bodySystemPairs} />
                    <hr className="border-t border-slate-300 dark:border-slate-800 my-2 max-w-xl w-full mx-auto" />
                    <SortingExercise
                        questions={bodySorting} />
                </section>
                <hr className="border-t border-slate-400 dark:border-slate-900 my-2 max-w-xl w-full mx-auto" />

                {/* Scores section: sample values hardcoded until we can hook up to scores in backend */}
                <section className="mx-auto p-4 sm:px-6 text-center">
                    {/* The idea is to set challenge points green if positive, red if negative (not done yet here) */}
                    <div className="font-semibold text-xl sm:text-2xl">
                        <p>
                            Lab points total:{" "}
                            <span className="text-emerald-600 dark:text-emerald-400">
                                +50
                            </span>
                        </p>
                        <p>
                            <span className="text-[#A60362] dark:text-[#CB3A8E]">
                                Leaderboard points total:
                            </span>{" "}
                            12550
                        </p>
                    </div>
                </section>
            </main>
        );
}
