"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

/* Still to do (an incomplete list)
- footer needs to be created in components
- colour scheme is just to get something started; not finalized at all (and haven't touched dark scheme yet)
- there are no breakpoints for responsive design yet; those need to be added
*/

export default function Home() {
	const router = useRouter();
	return (
		<div className="flex flex-col flex-1 items-center justify-center bg-[#2F3E49] font-sans">
			<main className="flex flex-1 w-full max-w-5xl flex-col items-center justify-between py-32 px-16 bg-[#2F3E49]">
				<div className="flex flex-col items-center gap-6 text-center">
					<h1 className="text-5xl font-bold leading-10 text-neutral-100">
						FACT FRENZY!
					</h1>
					<p className="text-lg leading-8 text-neutral-200">
						<strong>Game description goes here:</strong> Lorem ipsum dolor sit
						amet, consectetur adipiscing elit. Nulla scelerisque ut dolor non
						tristique. Vestibulum.
					</p>
				</div>
				<div className="my-6 flex flex-col w-1/4 text-xl font-bold sm:flex-row">
					<button
						className="flex h-12 w-full items-center justify-center rounded-full bg-[#C3CED6] px-5 text-slate-900 transition-colors hover:bg-slate-200"
						onClick={() => router.push("/try")}
					>
						Try it!
					</button>
					{/* 
          Moving the button below to the header; keeping the code here to copy over to header when creted
					<button
						className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-5 text-gray-50 transition-colors hover:bg-slate-700"
						onClick={() => router.push("/login")}
					>
						Login/Sign up
					</button>
          */}
				</div>
				<Image
					className="my-4 border-2 border-gray-300"
					src="/placeholder-500x300.png"
					alt="placeholder image"
					width={500}
					height={300}
				/>
			</main>
		</div>
	);
}
