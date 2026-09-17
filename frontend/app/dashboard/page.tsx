import DashboardShell from "@/components/dashboard-shell";

/*
TODO: replace this mock user with the real signed-in user's data once
auth/session handling is wired up.
*/
const mockUser = {
  name: "Alex",
  streak: 4,
};

export default function DashboardPage() {
  return <DashboardShell user={mockUser} role="user" />;
}
