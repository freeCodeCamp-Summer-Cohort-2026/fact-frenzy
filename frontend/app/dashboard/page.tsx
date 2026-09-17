import { redirect } from "next/navigation";
import DashboardShell from "@/components/dashboard-shell";

/*
TODO: replace this mock user with the real signed-in user's data once
auth/session handling is wired up (the login page is still a placeholder
too, see app/login/page.tsx).
*/
const mockUser = {
  name: "Alex",
  streak: 4,
  is_admin: true,
};

export default function DashboardPage() {
  // if user isn't an admin/creator, redirect to the dashboard page
  if (!mockUser.is_admin) {
    redirect("/")
  }

  return <DashboardShell user={mockUser} role="creator" />;
}
