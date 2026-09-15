import MatchingExercise from "../../components/MatchingExercise";
import SortingExercise from "../../components/SortingExercise";

export default function TryPage() {
    return (
        <main className="min-h-screen max-w-3xl mx-auto px-4 py-8 flex flex-col gap-4">
            <h1 className="text-3xl font-extrabold text-center text-slate-900 dark:text-slate-100 mb-2">
                Try Fact Frenzy
            </h1>
            
			<section className="exercise-section">
                <MatchingExercise />
            </section>
            
			<hr className="border-t border-slate-200 dark:border-slate-800 my-2 max-w-xl w-full mx-auto" />
            
            <section className="exercise-section">
                <SortingExercise />
            </section>
            
        </main>
    );
}
