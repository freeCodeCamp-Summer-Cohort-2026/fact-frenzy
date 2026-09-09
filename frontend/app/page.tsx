"use client";
import { useRouter } from "next/navigation";

/* Still to do (an incomplete list)
- navbar and footer (to be created in components so they can be reused)
- colour scheme is just to get something started; not finalized at all (and haven't touched dark scheme yet)
- there are no breakpoints for responsive design yet; those need to be added
*/

export default function Home() {
  const router = useRouter();
	return (
		<div className="flex flex-col flex-1 items-center justify-center bg-slate-200 font-sans">
			<main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white">
				<div className="flex flex-col items-center gap-6 text-center">
					<h1 className="text-4xl font-bold leading-10 text-black dark:text-zinc-50">
						FACT FRENZY!
					</h1>
					<p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
						Game description goes here
					</p>
				</div>
				<div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
					<button
						className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-slate-300 px-5 text-black transition-colors hover:bg-slate-200"
						onClick={() => router.push("/try")}
					>
						Try it!
					</button>
					<button
						className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 text-gray-50 transition-colors hover:bg-slate-700"
						onClick={() => router.push("/login")}
					>
						Login/Sign up
					</button>
				</div>
			</main>
		</div>
	);
}
