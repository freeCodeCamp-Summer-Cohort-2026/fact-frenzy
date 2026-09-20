"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

/* Still to do (an incomplete list)
- there are no breakpoints for responsive design yet; those need to be added
*/

export default function Home() {
	const router = useRouter();
	return (
		<div className="flex flex-col justify-center items-center bg-[#62d0f3] font-sans">
			<main className="flex w-full flex-col items-center justify-between py-15 bg-[#2F3E49]">
				{/* Title & description section */}
				<section className="flex flex-col items-center gap-4 text-center max-w-4xl mb-15">
					<h1 className="text-5xl font-bold leading-10 text-neutral-100">
						FACT FRENZY!
					</h1>
					<p className="text-lg leading-8 text-neutral-200">
						Build your knowledge of science facts while earning points and
						building daily streaks. Keep coming back to build up your points and
						top the leaderboard!
					</p>
					<div className="my-6 flex flex-col w-1/4 text-xl font-bold">
						<button
							className="flex h-13 items-center justify-center rounded-full bg-[#ea058c] px-5 text-slate-900 transition-colors hover:bg-[#FA9FD5]"
							onClick={() => router.push("/try")}
						>
							Try it!
						</button>
					</div>
				</section>

				{/* How it works section */}
				<section className="flex flex-col items-center text-center w-full bg-[#62d0f3] py-10">
					<div className="flex flex-col gap-4 max-w-4xl">
						<h1 className="text-4xl font-bold leading-10 text-[#070708]">
							How it works
						</h1>
						<p className="text-xl">
							Write some stuff here about how it works. And here are some more
							words to see how the text will wrap on the page. Here are even
							more words.
						</p>
						<Image
							className="my-4 mx-auto border-2 border-gray-300"
							src="/placeholder-500x300.png"
							alt="placeholder image"
							width={500}
							height={300}
							preload={true}
						/>
					</div>
				</section>

				{/* Features section */}
				<section className="flex flex-col items-center text-center w-full bg-[#2F3E49] py-10">
					<div className="flex flex-col gap-4 max-w-4xl">
						<h1 className="text-4xl font-bold leading-10 text-neutral-100">
							Features
						</h1>
						<p className="text-xl text-neutral-100">
							Some intro text to our list of features. Then there will be
							cards/boxes below with the features.
						</p>
					</div>
				</section>

				{/* Call to action to sign up or login */}
				<section className="w-full flex flex-col items-center gap-4 text-center bg-sky-100 py-10">
					<h1 className="text-4xl font-bold leading-10 text-[#070708]">
						Ready to jump in and begin learning?
					</h1>
					<p className="text-xl">Sign up using the button below!</p>
					<div className="flex flex-col mt-4 w-1/4 text-xl font-bold">
						<button
							className="flex h-13 items-center justify-center rounded-full bg-[#ea058c] px-5 text-slate-900 transition-colors hover:bg-[#FA9FD5]"
							onClick={() => router.push("/login")}
						>
							Sign up/Login
						</button>
					</div>
				</section>
			</main>
		</div>
	);
}
