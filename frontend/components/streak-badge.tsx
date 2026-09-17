
// we may also need to update this type maybe create types folder entirely  
type StreakBadgeProps = {
  streak: number;
};

/*
TODO: we can replace the hardcoded `streak` prop with real data once streak
tracking exists on the backend/user model.
*/
export default function StreakBadge({ streak }: StreakBadgeProps) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-slate-900">
      <span aria-hidden="true">🔥</span>
      <span>
        {streak}
      </span>
    </div>
  );
}
