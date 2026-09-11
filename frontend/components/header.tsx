import Link from "next/link";

/*
To do:
- navigation placeholder links: replace or delete
- navbar styling is basic for now: to be restyled later
*/

export default function Header() {
	return (
		<header className="w-full">
			<div className="mx-auto max-w-7xl px-4 sm:px-6">
				<nav className="flex h-13 items-center justify-between gap-3 bg-white/80 px-3">
					{/* navigation links */}
					<ul className="flex gap-x-6 text-lg font-semibold">
						<li>
							<Link href="/" className="hover:text-gray-600">
								Home
							</Link>
						</li>
						{/* placeholder links */}
						<li>Link2</li>
						<li>Link3</li>
					</ul>
					{/* Login/Sign in button; plus optional separate sign up button below */}
					<ul className="flex flex-1 text-lg font-semibold items-center justify-end gap-3">
						<li>
							<Link
								href="/login"
								className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-slate-800 px-4 text-gray-50 transition-colors hover:bg-slate-700"
							>
								Login / Sign Up
							</Link>
						</li>
						{/* Optional extra sign up button next to login button; sign up page not yet created
                        <li>
                            <Link
                            href=""
                            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-5 text-gray-50 transition-colors hover:bg-slate-700"
                            >
                            Sign up
                            </Link>
                        </li>
                        */}
					</ul>
				</nav>
			</div>
		</header>
	);
}
