"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	return (
		<header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

				{/* Brand */}
				<Link
					href="/"
					onClick={closeMenu}
					className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900"
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

				{/* Desktop Navigation */}
				<nav className="hidden items-center md:flex">
					<ul className="flex items-center gap-8 text-sm font-medium text-slate-600">
						<li>
							<Link
								href="/"
								className="relative py-2 transition-colors hover:text-[#A60362]"
							>
								Home
							</Link>
						</li>

						<li>
							<Link
								href="/about"
								className="py-2 transition-colors hover:text-[#A60362]"
							>
								About
							</Link>
						</li>

						<li>
							<Link
								href="/leaderboard"
								className="py-2 transition-colors hover:text-[#A60362]"
							>
								Leaderboard
							</Link>
						</li>
					</ul>
				</nav>

				{/* Actions */}
				<div className="flex items-center gap-2 sm:gap-3">

					{/* Login - hidden on mobile */}
					<Link
						href="/login"
						className="hidden rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 sm:inline-flex"
					>
						Log in
					</Link>

					{/* Get Started */}
					<Link
						href="/signup"
						className="inline-flex items-center justify-center rounded-lg bg-[#A60362] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#8c0253] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#A60362]/40 focus:ring-offset-2 sm:px-5"
					>
						Get Started
					</Link>

					{/* Mobile Menu Button */}
					<button
						type="button"
						onClick={() => setIsMenuOpen((open) => !open)}
						aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
						aria-expanded={isMenuOpen}
						className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-50 md:hidden"
					>
						{isMenuOpen ? (
							<X className="h-5 w-5" />
						) : (
							<Menu className="h-5 w-5" />
						)}
					</button>
				</div>
			</div>

			{/* Mobile Navigation */}
			{isMenuOpen && (
				<div className="border-t border-slate-200 bg-white md:hidden">
					<nav className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
						<ul className="flex flex-col gap-1 text-sm font-medium text-slate-600">

							<li>
								<Link
									href="/"
									onClick={closeMenu}
									className="block rounded-lg px-3 py-3 transition-colors hover:bg-slate-50 hover:text-[#A60362]"
								>
									Home
								</Link>
							</li>

							<li>
								<Link
									href="/about"
									onClick={closeMenu}
									className="block rounded-lg px-3 py-3 transition-colors hover:bg-slate-50 hover:text-[#A60362]"
								>
									About
								</Link>
							</li>

							<li>
								<Link
									href="/leaderboard"
									onClick={closeMenu}
									className="block rounded-lg px-3 py-3 transition-colors hover:bg-slate-50 hover:text-[#A60362]"
								>
									Leaderboard
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			)}
		</header>
	);

}
