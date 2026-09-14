"use client";

import { useState } from "react";
import { sortingFact } from "../app/try/data";

type FeedbackState = "correct" | "wrong" | null;

export default function SortingExercise() {
    const [feedback, setFeedback] = useState<FeedbackState>(null);
	const [solved, setSolved] = useState(false);
    const [selectedBin, setSelectedBin] = useState<boolean | null>(null); // Track targeted bin

    function evaluateChoice(binIsTrue: boolean) {
        if (solved) return;

        setSelectedBin(binIsTrue);

        const isCorrect=binIsTrue===sortingFact.isTrue;

        if (isCorrect) {
            setFeedback("correct");
            setSolved(true);
        } else {
            setFeedback("wrong");
            setTimeout(() => {
                setFeedback(null);
                setSelectedBin(null);
            }, 800);
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
        <div className="sorting-exercise">
			<h2>Sort the fact</h2>

        <div
        draggable={!solved}
        onDragStart={handleDragStart}
        className={`fact-card ${solved ? "fact-card--completed" : ""}`}
        >
            <span>{sortingFact.text}</span>
            {solved && <span className="check-badge">✓</span>}
        </div>

        <div className="bins">
            <button
                    type="button"
                    disabled={solved}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, true)}
                    onClick={() => evaluateChoice(true)}
                    className={`bin ${selectedBin === true && feedback === "correct" ? "bin--correct" : ""} ${
                    selectedBin === true && feedback === "wrong" ? "bin--wrong" : ""
                    }`}
                >
                    True
                </button>

                <button
                    type="button"
                    disabled={solved}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, false)}
                    onClick={() => evaluateChoice(false)}
                    className={`bin ${selectedBin === false && feedback === "correct" ? "bin--correct" : ""} ${
                    selectedBin === false && feedback === "wrong" ? "bin--wrong" : ""
                    }`}
                >
                    Untrue
                </button>

        </div>

        {solved && <p className="success-message">Correct!</p>}
        </div>
    );
}

