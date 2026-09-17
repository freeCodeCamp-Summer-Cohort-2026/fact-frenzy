import { redirect } from "next/navigation";
import DashboardShell from "@/components/dashboard-shell";

export default function CreatorDashboardPage() {
  // Built-in Next.js env variable — avoids hardcoded boolean checks in CI
  const isDev = process.env.NODE_ENV === "development";

  if (!isDev) {
    redirect("/dashboard");
  }

  const mockCreator = {
    name: "Jordan",
    streak: 12,
  };

  return <DashboardShell user={mockCreator} role="creator" />;
}