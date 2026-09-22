
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

const howItWorks = [
	{
		number: "01",
		title: "Choose a topic",
		description:
			"Explore different topics and choose an area you want to learn more about.",
		icon: "📚",
	},
	{
		number: "02",
		title: "Learn & explore",
		description:
			"Go through interactive modules, tutorials, and practical labs designed to make learning engaging.",
		icon: "🧠",
	},
	{
		number: "03",
		title: "Test yourself",
		description:
			"Challenge your knowledge with quizzes, questions, and interactive challenges.",
		icon: "🎯",
	},
];

const learningFeatures = [
	{
		title: "Learning Modules",
		description:
			"Structured learning experiences that help you understand concepts step by step.",
		icon: "📖",
	},
	{
		title: "Interactive Tutorials",
		description:
			"Learn through engaging tutorials designed to turn complex ideas into simple concepts.",
		icon: "💡",
	},
	{
		title: "Practical Labs",
		description:
			"Put your knowledge into practice with hands-on challenges and interactive exercises.",
		icon: "🧪",
	},
];

const featuredTopics = [
	{
		title: "Technology",
		description: "Explore software, AI, cybersecurity, and emerging technologies.",
		icon: "💻",
	},
	{
		title: "Science",
		description: "Discover fascinating ideas from biology, physics, chemistry, and more.",
		icon: "🔬",
	},
	{
		title: "History",
		description: "Travel through time and discover events that shaped our world.",
		icon: "🏛️",
	},
	{
		title: "General Knowledge",
		description: "Challenge yourself with interesting facts from around the world.",
		icon: "🌍",
	},
];

export default function Home() {
	const router = useRouter();

	return (
		<main className="min-h-screen bg-slate-50 text-slate-900">
			{/* =====================================================
			    HERO SECTION
			===================================================== */}
			<section className="relative overflow-hidden bg-white">
				{/* Background decoration */}
				<div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-[#A60362]/10 blur-3xl" />
				<div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#A60362]/5 blur-3xl" />

				<div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
					{/* Hero content */}
					<div className="max-w-2xl">


						<h1 className="text-5xl font-bold leading-tight tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
							Turn curiosity into{" "}
							<span className="text-[#A60362]">knowledge.</span>
						</h1>

						<p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
							Fact Frenzy is an interactive learning and knowledge platform
							that makes discovering facts, learning new concepts, and
							challenging yourself fun and engaging.
						</p>

						<div className="mt-8 flex flex-col gap-3 sm:flex-row">
							<button
								onClick={() => router.push("/try")}
								className="inline-flex h-12 items-center justify-center rounded-lg bg-[#A60362] px-7 font-semibold text-white shadow-lg shadow-[#A60362]/20 transition-all hover:bg-[#8c0253] hover:shadow-xl"
							>
								Start Learning
								<span className="ml-2">→</span>
							</button>

							<button
								onClick={() => router.push("/about")}
								className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-200 bg-white px-7 font-semibold text-slate-700 transition-colors hover:bg-slate-50"
							>
								Explore Fact Frenzy
							</button>
						</div>

						{/* Small trust/features row */}
						<div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
							<span className="flex items-center gap-2">
								<span className="text-[#A60362]">✓</span>
								Interactive learning
							</span>

							<span className="flex items-center gap-2">
								<span className="text-[#A60362]">✓</span>
								Knowledge challenges
							</span>

							<span className="flex items-center gap-2">
								<span className="text-[#A60362]">✓</span>
								Practical labs
							</span>
						</div>
					</div>

					{/* Hero visual */}
					<div className="relative">
						<div className="relative mx-auto max-w-lg">
							<div className="absolute -inset-4 rounded-3xl bg-[#A60362]/10 blur-2xl" />

							<div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl">
								<Image
									src="/placeholder-500x300.png"
									alt="Fact Frenzy learning interface"
									width={700}
									height={450}
									className="h-auto w-full rounded-xl object-cover"
								/>
							</div>

							{/* Floating score card */}
							<div className="absolute -bottom-6 -left-6 hidden rounded-xl border border-slate-200 bg-white p-4 shadow-xl sm:block">
								<p className="text-xs font-medium text-slate-500">
									Your progress
								</p>

								<div className="mt-1 flex items-center gap-3">
									<div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
										<div className="h-full w-3/4 rounded-full bg-[#A60362]" />
									</div>

									<span className="text-sm font-bold text-slate-900">
										75%
									</span>
								</div>
							</div>

							{/* Floating points card */}
							<div className="absolute -right-4 -top-5 hidden rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xl sm:block">
								<p className="text-xs text-slate-500">Knowledge points</p>
								<p className="text-xl font-bold text-[#A60362]">2,450 XP</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* =====================================================
			    INTRODUCTION
			===================================================== */}
			<section className="bg-slate-50 py-20 sm:py-24">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mx-auto max-w-3xl text-center">
						<p className="text-sm font-bold uppercase tracking-widest text-[#A60362]">
							About Fact Frenzy
						</p>

						<h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
							Learning should be more than just reading.
						</h2>

						<p className="mt-5 text-lg leading-8 text-slate-600">
							Fact Frenzy brings learning and interactive challenges together.
							Instead of simply consuming information, you get to explore
							topics, test your understanding, and apply what you've learned.
						</p>
					</div>

					<div className="mt-14 grid gap-6 md:grid-cols-3">
						<div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
							<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#A60362]/10 text-2xl">
								🧠
							</div>

							<h3 className="mt-5 text-xl font-bold">Learn</h3>

							<p className="mt-3 leading-7 text-slate-600">
								Build your understanding through structured content and
								interactive learning experiences.
							</p>
						</div>

						<div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
							<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#A60362]/10 text-2xl">
								🔎
							</div>

							<h3 className="mt-5 text-xl font-bold">Explore</h3>

							<p className="mt-3 leading-7 text-slate-600">
								Discover interesting topics and expand your knowledge beyond
								the classroom.
							</p>
						</div>

						<div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
							<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#A60362]/10 text-2xl">
								🏆
							</div>

							<h3 className="mt-5 text-xl font-bold">Challenge</h3>

							<p className="mt-3 leading-7 text-slate-600">
								Test what you know through quizzes, challenges, and practical
								exercises.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* =====================================================
			    HOW IT WORKS
			===================================================== */}
			<section className="bg-white py-20 sm:py-24">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="max-w-2xl">
						<p className="text-sm font-bold uppercase tracking-widest text-[#A60362]">
							How It Works
						</p>

						<h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
							A simple way to keep learning.
						</h2>

						<p className="mt-4 text-lg leading-8 text-slate-600">
							Start with a topic, learn at your own pace, and put your
							knowledge to the test.
						</p>
					</div>

					<div className="mt-14 grid gap-8 md:grid-cols-3">
						{howItWorks.map((item) => (
							<div key={item.number} className="relative">
								<div className="flex items-start gap-5">
									<div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#A60362] text-2xl text-white shadow-lg shadow-[#A60362]/20">
										{item.icon}
									</div>

									<div>
										<span className="text-sm font-bold text-[#A60362]">
											{item.number}
										</span>

										<h3 className="mt-1 text-xl font-bold text-slate-950">
											{item.title}
										</h3>

										<p className="mt-2 leading-7 text-slate-600">
											{item.description}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* =====================================================
			    LEARNING MODULES
			===================================================== */}
			<section className="bg-slate-950 py-20 text-white sm:py-24">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mx-auto max-w-3xl text-center">
						<p className="text-sm font-bold uppercase tracking-widest text-pink-400">
							Learn Your Way
						</p>

						<h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
							More than just quizzes.
						</h2>

						<p className="mt-5 text-lg leading-8 text-slate-300">
							Build real understanding through multiple ways of learning and
							practising your knowledge.
						</p>
					</div>

					<div className="mt-14 grid gap-6 md:grid-cols-3">
						{learningFeatures.map((feature) => (
							<div
								key={feature.title}
								className="rounded-2xl border border-white/10 bg-white/5 p-7 transition-colors hover:bg-white/10"
							>
								<div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#A60362] text-2xl">
									{feature.icon}
								</div>

								<h3 className="mt-6 text-xl font-bold">{feature.title}</h3>

								<p className="mt-3 leading-7 text-slate-300">
									{feature.description}
								</p>

								<button className="mt-6 text-sm font-semibold text-pink-400 transition-colors hover:text-pink-300">
									Explore →
								</button>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* =====================================================
			    FEATURED TOPICS
			===================================================== */}
			<section className="bg-slate-50 py-20 sm:py-24">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
						<div>
							<p className="text-sm font-bold uppercase tracking-widest text-[#A60362]">
								Explore
							</p>

							<h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
								Featured topics
							</h2>

							<p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
								Find something interesting and start exploring.
							</p>
						</div>

						<button className="font-semibold text-[#A60362] hover:underline">
							View all topics →
						</button>
					</div>

					<div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
						{featuredTopics.map((topic) => (
							<button
								key={topic.title}
								className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-[#A60362]/30 hover:shadow-lg"
							>
								<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-2xl transition-colors group-hover:bg-[#A60362]/10">
									{topic.icon}
								</div>

								<h3 className="mt-5 text-lg font-bold text-slate-950">
									{topic.title}
								</h3>

								<p className="mt-2 text-sm leading-6 text-slate-600">
									{topic.description}
								</p>

								<span className="mt-5 inline-block text-sm font-semibold text-[#A60362]">
									Explore topic →
								</span>
							</button>
						))}
					</div>
				</div>
			</section>

			{/* =====================================================
			    FINAL CTA
			===================================================== */}
			<section className="bg-white py-20 sm:py-24">
				<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
					<div className="relative overflow-hidden rounded-3xl bg-[#A60362] px-6 py-14 text-center text-white sm:px-12 sm:py-16">
						<div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
						<div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-black/10 blur-3xl" />

						<div className="relative">
							<h2 className="text-3xl font-bold sm:text-4xl">
								Ready to put your knowledge to the test?
							</h2>

							<p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-pink-100">
								Start exploring Fact Frenzy and discover a more engaging way
								to learn, practise, and challenge yourself.
							</p>

							<button
								onClick={() => router.push("/try")}
								className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-white px-7 font-semibold text-[#A60362] shadow-lg transition-all hover:bg-slate-100"
							>
								Start Your Journey →
							</button>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
