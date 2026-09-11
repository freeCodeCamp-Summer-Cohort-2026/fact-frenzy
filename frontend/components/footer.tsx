export default function Footer() {
	return (
		<footer className="w-full">
			<div className="flex items-center justify-between gap-x-6 h-12 mx-auto max-w-7xl bg-white/80 px-4 sm:px-6">
				<div className="flex justify-start text-base">
					<p>2026 Fact Frenzy</p>
				</div>
				<div className="flex justify-end text-base">
					<a
						href="https://github.com/freeCodeCamp-Summer-Cohort-2026/fact-frenzy"
						className="hover:text-gray-600"
					>
						Github
					</a>
				</div>
			</div>
		</footer>
	);
}
