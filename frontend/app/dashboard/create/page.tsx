import { redirect } from "next/navigation";
import DashboardShell from "@/components/dashboard-shell";

/*
TODO: Replace this mock session with the real auth session once backend
session handling is wired up.
*/
const mockSession = {
  user: {
    name: "Jordan",
    streak: 12,
    is_admin: false, // Default security check
  },
};

export default function CreatorDashboardPage() {
  // Route guard: Redirect non-creators/non-admins to the main user dashboard
  if (!mockSession?.user?.is_admin) {
    redirect("/dashboard");
  }

  return <DashboardShell user={mockSession.user} role="creator" />;
}
