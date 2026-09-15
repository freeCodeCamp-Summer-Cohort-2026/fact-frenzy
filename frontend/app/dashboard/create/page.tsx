import DashboardShell from "@/components/dashboard-shell";

/*
TODO: replace this mock user with the real signed-in creator's data once
auth/session handling is wired up. Also still needs a route guard so a
non-creator (is_admin: false) can't just navigate here directly.
*/
const mockCreator = {
  name: "Jordan",
  streak: 12,
};

export default function CreatorDashboardPage() {
  return <DashboardShell user={mockCreator} role="creator" />;
}
