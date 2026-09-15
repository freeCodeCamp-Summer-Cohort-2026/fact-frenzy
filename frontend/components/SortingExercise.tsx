"use client";

import { useState, useRef, useEffect } from "react";
import { sortingFact } from "../app/try/data";

type FeedbackState = "correct" | "wrong" | null;

export default function SortingExercise() {
    const [feedback, setFeedback] = useState<FeedbackState>(null);
	const [solved, setSolved] = useState(false);
    const [selectedBin, setSelectedBin] = useState<boolean | null>(null); // Track targeted bin

    // reference to track the timeout timer
    const timerRef=useRef<ReturnType<typeof setTimeout> | null>(null);

    // automatically clear the timer if component unmounts
    useEffect(()=>{
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    function evaluateChoice(binIsTrue: boolean) {
        if (solved) return;

        setSelectedBin(binIsTrue);

        const isCorrect=binIsTrue===sortingFact.isTrue;

        if (isCorrect) {
            setFeedback("correct");
            setSolved(true);
        } else {
            setFeedback("wrong");

            // clear any existing timer before starting a new one
            if (timerRef.current) clearTimeout(timerRef.current);

            timerRef.current = setTimeout(() => {
                setFeedback(null);
                setSelectedBin(null);
            }, 1000);
        }
    }
    
    // Drag and drop handlers
    function handleDragStart(e: React.DragEvent) {
        e.dataTransfer.setData("text/plain", sortingFact.id)
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
			<h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Sort the fact</h2>

        <div
        draggable={!solved}
        onDragStart={handleDragStart}
        className={`p-6 rounded-xl bg-slate-800 text-white font-medium text-center shadow-md transition-all select-none border border-slate-700 ${
        solved
            ? "opacity-75 cursor-default ring-2 ring-emerald-500"
            : "cursor-grab active:cursor-grabbing hover:bg-slate-700"
        }`}
        >
            <span>{sortingFact.text}</span>
            {solved && <span className="ml-2 font-bold text-emerald-400">✓</span>}
        </div>

        <div className="grid grid-cols-2 gap-4">

            <button
            type="button"
            disabled={solved}
            onDragOver={(e) => !solved && handleDragOver(e)}
            onDrop={(e) => handleDrop(e, true)}
            onClick={() => evaluateChoice(true)}
            className={`p-4 rounded-lg font-semibold transition-colors ${
            selectedBin === true && feedback === "correct"
            ? "bg-emerald-600 text-white ring-2 ring-emerald-400"
            : selectedBin === true && feedback === "wrong"
            ? "bg-rose-600 text-white ring-2 ring-rose-400"
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
            : "border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900/80 text-slate-900 dark:text-slate-100 hover:border-slate-400 dark:hover:border-slate-500 disabled:pointer-events-none"
            }`}
            >
                Untrue
            </button>
        </div>

        {solved && (
            <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-center">
            Correct!
            </p>
        )}

        {feedback === "wrong" && (
        <p className="text-rose-600 dark:text-rose-400 font-semibold text-center" aria-live="polite">
        Incorrect. Try again!
        </p>
        )}
        </div>
    );
}
