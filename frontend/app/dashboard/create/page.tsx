import { redirect } from "next/navigation";
import DashboardShell from "@/components/dashboard-shell";

// TODO: SECURITY PLACEHOLDER - Mock session with hardcoded admin role for dev testing. Replace with real session check before production.
const mockSession = {
  user: {
    name: "Jordan",
    streak: 12,
    is_admin: true,
  },
};

export default function CreatorDashboardPage() {
  // TODO: SECURITY - Replace mock check with real server-side auth verification before production
  if (!mockSession?.user?.is_admin) {
    redirect("/dashboard");
  }

  return <DashboardShell user={mockSession.user} role="creator" />;
}

