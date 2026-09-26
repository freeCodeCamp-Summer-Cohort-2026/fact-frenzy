import MatchingExercise from "../../components/MatchingExercise";
import SortingExercise from "../../components/SortingExercise";

// Draft template page for challenges. The idea would be to have everything here remain the same except the activities
// section, which would change dynamically based on data from the backend. Hopefully, [Module_name], [Challenge_name], 
// and [Activity_descriptions] below could also come from backend data once hooked up.

// For the moment, the activities from the /try page are inserted here while working on how to pull dynamic data
// from the backend into this single template.

// TO DO: adjust MatchingExercise and SortingExercise files to match new styling, including colours as well as width 
// (so that dividing line between activities is centred on page content)

export default function ChallengePage() {
    return (
			<main className="bg-slate-50 min-h-screen max-w-6xl mx-auto px-4 py-8 flex flex-col gap-4">
				<h1 className="text-3xl font-extrabold text-center text-[#A60362] dark:text-[#FA7CC5] mb-2 sm:text-4xl">
					[Module_name] Challenge:{" "}
					<span className="text-slate-900 dark:text-slate-100">
						[Challenge_name]
					</span>
				</h1>

				{/* Instructions section */}
				<section className="mx-auto max-w-7xl p-4 text-center sm:px-6">
					<p className="text-xl leading-7 font-semibold text-slate-700 sm:text-2xl">
						Complete all activities correctly to earn points towards your weekly
						leaderboard score!
					</p>
					<p className="text-lg mt-8 font-bold uppercase tracking-wide text-[#A60362] sm:text-xl">
						Instructions and scoring
					</p>
					<p className="mt-3 text-lg sm:text-xl">
						In the activities below, drag boxes onto their correct answers. See the bottom of the page for your scores.
					</p>
					<div className="mt-5 text-left text-lg sm:text-xl">
						<p>
							<strong>Challenge score:</strong> Each correct earns 10 challenge
							points. But if you get any answers wrong, then you lose 10
							challenge points.{" "}
						</p>
						<p className="mt-3">
							<strong>Leaderboard score:</strong> Your total challenge points
							after the lab is complete are added to your weekly leaderboard
							score (or deducted from that score, if the total challenge points
							are negative).
						</p>
					</div>
				</section>
				<hr className="border-t border-slate-400 dark:border-slate-900 my-2 max-w-xl w-full mx-auto" />

				{/* Activities section. This would pull in the activities, including [Activity_descriptions], from the backend */}
				<section className="max-w-5xl">
					<MatchingExercise />
					<hr className="border-t border-slate-300 dark:border-slate-800 my-2 max-w-xl w-full mx-auto" />
					<SortingExercise />
				</section>
				<hr className="border-t border-slate-400 dark:border-slate-900 my-2 max-w-xl w-full mx-auto" />

				{/* Scores section: sample values hardcoded until we can hook up to scores in backend */}
				<section className="mx-auto max-w-7xl p-4 sm:px-6 text-center font-bold uppercase text-xl sm:text-2xl">
					{/* The idea is to set challenge points green if positive, red if negative (not done yet here) */}
					<p>
						Challenge points total:{" "}
						<span className="text-emerald-700 dark:text-emerald-400">+50</span>
					</p>
					<p className="mt-5">
						<span className="text-[#A60362] dark:text-[#FA7CC5]">
							Leaderboard points total:
						</span> 12550
					</p>
				</section>
			</main>
		);
}


