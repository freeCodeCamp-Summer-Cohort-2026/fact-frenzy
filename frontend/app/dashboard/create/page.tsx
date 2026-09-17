import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import DashboardShell from "@/components/dashboard-shell";

// Mock session lookup (simulates backend session until Auth PR merges)
async function getSession() {
  const cookieStore = await cookies();
  const userRole = cookieStore.get("user_role")?.value || "creator";

  return {
    user: {
      name: "Jordan",
      streak: 12,
      role: userRole,
    },
  };
}

export default async function CreatorDashboardPage() {
  const session = await getSession();

  // Server-side role check
  if (session?.user?.role !== "creator") {
    redirect("/dashboard");
  }

  return <DashboardShell user={session.user} role="creator" />;
}
