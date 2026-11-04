"use client";

import { useState } from "react";
import { Question } from "@/types/questions";
import { submitAnswer } from "@/lib/api";

type FeedbackState = "correct" | "wrong" | "error" | "waiting" | null;

// this wrapper takes the list of sorting questions and separates them out so each question goes into `SortingCard`
export default function SortingExercise({ questions }: { questions: Question[] }) {
  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
		Sort the facts into true or untrue
	</h2>
      {questions.map((q) => <SortingCard key={q.id} question={q} />)}
    </div>
  );
}

function SortingCard({ question }: { question: Question }) {
	const [feedback, setFeedback] = useState<FeedbackState>(null);
	const [solved, setSolved] = useState(false);
	const [selectedBin, setSelectedBin] = useState<boolean | null>(null); // Track targeted bin

	// evaluate by submitting answer to api and awaiting response, since .isCorrect is only on the server
	async function evaluateChoice(binIsTrue: boolean) {
  		if (solved || feedback === "waiting") return; // stop if solved or answer submitted & waiting for api response
  		const option = question.options.find(
    		(o) => o.text === (binIsTrue ? "True" : "Untrue")
  		);
  		if (!option) return;
  		setSelectedBin(binIsTrue);
		setFeedback("waiting") // in case api call takes some time
		try {
  			const { is_correct } = await submitAnswer(question.id, option.id);
  			setFeedback(is_correct ? "correct" : "wrong");
  			setSolved(true); // locking the card, in labs the first answer is final
		} catch (error) {
			console.error(error)
			setSelectedBin(null);
			setFeedback("error");
		}
	}

	// Drag and drop handlers
	function handleDragStart(e: React.DragEvent) {
		e.dataTransfer.setData("text/plain", question.id.toString()); 
	}

	function handleDragOver(e: React.DragEvent) {
		e.preventDefault();
	}

	// binIsTrue tells us which bin (True or Untrue) the card was dropped in
	function handleDrop(e: React.DragEvent, binIsTrue: boolean) {
		e.preventDefault();
		evaluateChoice(binIsTrue);
	}

	return (
		<div className="flex flex-col gap-4 max-w-xl mx-auto py-2">
			<div
				draggable={!solved}
				onDragStart={handleDragStart}
				className={`p-6 w-full mx-auto max-w-fit rounded-xl bg-[#62d0f3] text-black font-medium text-center shadow-md transition-all select-none ${
					feedback === "correct"
						? "opacity-75 cursor-default ring-2 ring-emerald-500"
						: "cursor-grab active:cursor-grabbing hover:bg-[#37BAE4]"
				}`}
			>
				<span>{question.text}</span>
				{(feedback === "correct") && <span className="ml-2 font-bold text-emerald-600">✓</span>}
			</div>

			<div className="grid grid-cols-2 gap-4">
				<button
					type="button"
					disabled={solved || feedback==="waiting"}
					onDragOver={(e) => !(solved || feedback==="waiting") && handleDragOver(e)}
					onDrop={(e) => handleDrop(e, true)}
					onClick={() => evaluateChoice(true)}
					className={`p-4 rounded-lg font-semibold transition-colors ${
						selectedBin === true && feedback === "correct"
							? "bg-emerald-600 text-white ring-2 ring-emerald-400"
							: selectedBin === true && feedback === "wrong"
								? "bg-rose-600 text-white ring-2 ring-rose-400"
								: selectedBin === true && feedback === "waiting"
									? "border-2 border-dotted border-slate-500 dark:border-slate-500 bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-slate-100 disabled:pointer-events-none"
									: "border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900/80 text-slate-900 dark:text-slate-100 hover:border-slate-400 dark:hover:border-slate-500 disabled:pointer-events-none"
					}`}
				>
					True
				</button>

				<button
					type="button"
					disabled={solved}
					onDragOver={(e) => !solved && handleDragOver(e)}
					onDrop={(e) => handleDrop(e, false)}
					onClick={() => evaluateChoice(false)}
					className={`p-4 rounded-lg font-semibold transition-colors ${
						selectedBin === false && feedback === "correct"
							? "bg-emerald-600 text-white ring-2 ring-emerald-400"
							: selectedBin === false && feedback === "wrong"
								? "bg-rose-600 text-white ring-2 ring-rose-400"
								: selectedBin === false && feedback === "waiting"
									? "border-2 border-dotted border-slate-500 dark:border-slate-500 bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-slate-100 disabled:pointer-events-none"
									: "border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900/80 text-slate-900 dark:text-slate-100 hover:border-slate-400 dark:hover:border-slate-500 disabled:pointer-events-none"
					}`}
				>
					Untrue
				</button>
			</div>

			{(feedback === "correct") && (
				<p className="text-emerald-600 dark:text-emerald-400 font-semibold text-center text-lg">
					Correct!
				</p>
			)}

			{(feedback === "wrong") && (
				<p
					className="text-rose-600 dark:text-rose-400 font-semibold text-center text-lg"
					aria-live="polite"
				>
					Incorrect
				</p>
			)}

			{(feedback === "error") && (
				<p
					className="text-[#A60362] dark:text-[#CB3A8E] font-semibold italic text-center text-lg"
				>
					Submission error, please try again
				</p>
			)}


			{(feedback === "waiting") && (
				<p
					className="text-slate-900 dark:text-slate-100 font-semibold italic text-center text-lg"
				>
					Waiting for submission response
				</p>
			)}
		</div>
	);
}
