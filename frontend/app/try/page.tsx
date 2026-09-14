import MatchingExercise from "../../components/MatchingExercise";
import SortingExercise from "../../components/SortingExercise";

export default function TryPage() {
    return (
        <main className="try-page">
            <h1>Try Fact Frenzy</h1>
            
			<section className="exercise-section">
                <MatchingExercise />
            </section>
            
			<hr />

            <section className="exercise-section">
                <SortingExercise />
            </section>
            
        </main>
    );
}
