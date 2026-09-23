import Link from "next/link";

export default function Footer() {
	return (
		<footer className="bg-slate-950 text-slate-300">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Main footer */}
				<div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
					{/* Brand */}
					<div className="lg:col-span-2">
						<Link
							href="/"
							className="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-white"
						>
							<div className="relative flex h-9 w-9 items-center justify-center bg-[#A60362]">
								<div className="relative h-5 w-4">
									<div className="absolute left-0 top-0 h-1 w-4 rounded-full bg-white" />
									<div className="absolute left-0 top-2 h-1 w-3 rounded-full bg-white" />
									<div className="absolute left-0 top-0 h-5 w-1 rounded-full bg-white" />
								</div>
							</div>

							<span>
								Fact<span className="text-[#A60362]">Frenzy</span>
							</span>
						</Link>

						<p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
							An interactive platform for discovering facts, exploring
							interesting topics, learning new concepts, and challenging
							yourself.
						</p>
					</div>

					{/* Explore */}
					<div>
						<h3 className="text-sm font-semibold text-white">Explore</h3>

						<ul className="mt-4 space-y-3 text-sm">
							<li>
								<Link
									href="/"
									className="transition-colors hover:text-white"
								>
									Home
								</Link>
							</li>

							<li>
								<Link
									href="/about"
									className="transition-colors hover:text-white"
								>
									About
								</Link>
							</li>

							<li>
								<Link
									href="/leaderboard"
									className="transition-colors hover:text-white"
								>
									Leaderboard
								</Link>
							</li>

							<li>
								<Link
									href="/try"
									className="transition-colors hover:text-[#A60362]"
								>
									Start Learning
								</Link>
							</li>
						</ul>
					</div>

					{/* Resources */}
					<div>
						<h3 className="text-sm font-semibold text-white">Resources</h3>

						<ul className="mt-4 space-y-3 text-sm">
							<li>
								<a
									href="https://github.com/freeCodeCamp-Summer-Cohort-2026/fact-frenzy"
									target="_blank"
									rel="noopener noreferrer"
									className="transition-colors hover:text-white"
								>
									GitHub
								</a>
							</li>

							<li>
								<Link
									href="/topics"
									className="transition-colors hover:text-white"
								>
									Topics
								</Link>
							</li>

							<li>
								<Link
									href="/modules"
									className="transition-colors hover:text-white"
								>
									Learning Modules
								</Link>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom footer */}
				<div className="flex flex-col gap-4 border-t border-white/10 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
					<p className="text-slate-500">
						© 2026 Fact Frenzy · MIT License
					</p>

					<div className="flex items-center gap-5">
						<Link
							href="/privacy"
							className="text-slate-500 transition-colors hover:text-white"
						>
							Privacy
						</Link>

						<Link
							href="/terms"
							className="text-slate-500 transition-colors hover:text-white"
						>
							Terms
						</Link>

						<a
							href="https://github.com/freeCodeCamp-Summer-Cohort-2026/fact-frenzy"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Fact Frenzy GitHub"
							className="text-slate-500 transition-colors hover:text-[#A60362]"
						>
							<svg
								viewBox="0 0 24 24"
								fill="currentColor"
								className="h-5 w-5"
								aria-hidden="true"
							>
								<path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.5.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .267.18.578.688.48A10.019 10.019 0 0 0 22 12.017C22 6.484 17.523 2 12 2Z" />
							</svg>
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
