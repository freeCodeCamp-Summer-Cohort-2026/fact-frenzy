"use client";

import { useState, useEffect, useRef } from "react";
import { Matching } from "@/types/matching-sorting-types";

function shuffle<T>(array: T[]): T[] {
    const result=[...array]
    for (let i=result.length-1; i>0; i--) {
        const j: number=Math.floor(Math.random()*(i+1));
        [result[i], result[j]]=[result[j], result[i]]
    }
    return result;
}

type FeedbackState="correct" | "wrong" | null

export default function MatchingExercise({ questions }: { questions: Matching[] }) {
	const [matched, setMatched] = useState<Record<string, boolean>>({});
	const [feedback, setFeedback] = useState<Record<string, FeedbackState>>({});
	const [shuffledPairs, setShuffledPairs] = useState(questions);

	useEffect(() => {
		setShuffledPairs(shuffle(questions));
	}, []);

	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, []);

	const allMatched = Object.keys(matched).length === questions.length;

	// This is for remembering which draggable card is being dragged
	function handleDragStart(e: React.DragEvent, draggableId: string) { 
		e.dataTransfer.setData("text/plain", draggableId);
	}

	// Required for onDrop to fire since browsers block drops by default
	function handleDragOver(e: React.DragEvent) {
		e.preventDefault();
	}

	// This is called when a draggable card is dropped onto a static card's drop zone
	function handleDrop(e: React.DragEvent, staticId: string) { 
		e.preventDefault();

		// Early return if this static card is already matched
		if (matched[staticId]) return;

		const droppedDraggableId = e.dataTransfer.getData("text/plain");

		if (droppedDraggableId === staticId) {
			// if they share the same ID, it means it's the correct match
			setMatched((prev) => ({ ...prev, [staticId]: true }));
			setFeedback((prev) => ({ ...prev, [staticId]: "correct" }));
		} else {
			// wrong - show brief ref feedback and then clear it so they can try again
			setFeedback((prev) => ({ ...prev, [staticId]: "wrong" }));

			if (timerRef.current) clearTimeout(timerRef.current);

			timerRef.current = setTimeout(() => {
				setFeedback((prev) => ({ ...prev, [staticId]: null }));
			}, 800);
		}
	}

	return (
		<div className="flex flex-col gap-6 max-w-2xl mx-auto p-4">
			{/* TODO: change the below so as to print different instructions when called on different pages */}
			<h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
				Match each capital to its country 
			</h2> 

			<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
				{shuffledPairs.map((pair) => {
					// after a pair has been matched successfully, hide it from the draggable pool
					if (matched[pair.id]) return null;

                    return (
                        <div
                            key={pair.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, pair.id)}
                            className="p-3 bg-[#62d0f3] text-black rounded-lg text-center font-medium cursor-grab active:cursor-grabbing shadow hover:bg-[#37BAE4] transition-colors select-none"
                        >
                            {pair.draggable} 
                        </div>
                    );
                })}
            </div>

			<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
				{questions.map((pair) => {
					const isMatched = matched[pair.id];
					const state = feedback[pair.id];

					let zoneStyle =
						"border-2 border-dashed border-slate-400 dark:border-slate-600 bg-slate-100 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100";
					if (isMatched || state === "correct")
						zoneStyle =
							"border-2 border-solid border-emerald-500 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200";
					if (state === "wrong")
						zoneStyle =
							"border-2 border-solid border-rose-500 bg-rose-100 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200";

					return (
						<div
							key={pair.id}
							onDragOver={(e) => !isMatched && handleDragOver(e)}
							onDrop={(e) => handleDrop(e, pair.id)}
							className={`p-3 rounded-lg text-center text-sm font-semibold flex flex-col items-center justify-center min-h-16 transition-colors ${zoneStyle}`}
						>
							<span>{pair.static}</span> 
							{isMatched && (
								<span className="text-xs mt-1 text-emerald-700 dark:text-emerald-400">
									→ {pair.draggable}
								</span>
							)}
						</div>
					);
				})}
			</div>

			{allMatched && (
				<p className="text-emerald-600 dark:text-emerald-400 font-semibold text-center text-lg">
					All matched! Nice work.
				</p>
			)}
		</div>
	);
}
