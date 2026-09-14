"use client";

import { useState, useEffect, useRef } from "react";
import { countryCapitalPairs } from "../app/try/data";

function shuffle<T>(array: T[]): T[] {
    const result=[...array]
    for (let i=result.length-1; i>0; i--) {
        const j: number=Math.floor(Math.random()*(i+1));
        [result[i], result[j]]=[result[j], result[i]]
    }
    return result;
}

type FeedbackState="correct" | "wrong" | null

export default function MatchingExercise() {
    const [matched, setMatched]=useState<Record<string, boolean>>({});
    const [feedback, setFeedback]=useState<Record<string, FeedbackState>>({});
    const [shuffledPairs, setShuffledPairs]=useState(countryCapitalPairs);

    useEffect(() => {
    setShuffledPairs(shuffle(countryCapitalPairs));
    }, []);

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
    return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
    };
    }, []);

    const allMatched=Object.keys(matched).length===countryCapitalPairs.length;

    // This is for remembering which capital card is being dragged
    function handleDragStart(e: React.DragEvent, capitalId: string) {
        e.dataTransfer.setData("text/plain", capitalId)
    }

    // Required for onDrop to fire since browsers block drops by default
	function handleDragOver(e: React.DragEvent) {
		e.preventDefault();
	}

    // This is called when a capital card is dropped onto a country card's drop zone
    function handleDrop(e: React.DragEvent, countryId: string) {
        e.preventDefault();

        // Early return if this country is already matched
        if (matched[countryId]) return;

        const droppedCapitalId=e.dataTransfer.getData("text/plain")

        if (droppedCapitalId===countryId) {
            // if they share the same ID, it means it's the correct match
            setMatched((prev)=>({...prev, [countryId]: true}));
            setFeedback((prev)=>({...prev, [countryId]: "correct"}));
        } else {
            // wrong - show brief ref feedback and then clear it so they can try again
            setFeedback((prev)=>({...prev, [countryId]: "wrong"}));

            if (timerRef.current) clearTimeout(timerRef.current);

            timerRef.current=setTimeout(()=>{
                setFeedback((prev)=>({...prev, [countryId]: null}));
            }, 800);
        }
    }

    return (
        <div className="matching-exercise">
            <h2>Match each country to its capital</h2>

            <div className="capitals">
                {shuffledPairs.map((pair)=>{
                    // after a capital has been matched successfully, hide it from the draggable pool
                    if (matched[pair.id]) return null;

                    return (
                        <div
                        key={pair.id}
						draggable
                        onDragStart={(e) => handleDragStart(e, pair.id)}
						className="capital-card"
                        >
                            {pair.capital}
                        </div>
                    );
                })}
            </div>

            <div className="countries">
                {countryCapitalPairs.map((pair)=>{
                    const isMatched=matched[pair.id]
                    const state=feedback[pair.id]

                    return (
                        <div
                        key={pair.id}
                        onDragOver={handleDragOver}
                        onDrop={(e)=>handleDrop(e, pair.id)}
                        className={`drop-zone ${state==="correct" ? "drop-zone--correct" : ""} ${
								state === "wrong" ? "drop-zone--wrong" : ""
							}`}
                        >
                            <span>{pair.country}</span>
                            {isMatched && <span className="matched-capital">→ {pair.capital}</span>}
                        </div>
                    )
                })}
            </div>

            {allMatched && <p className="success-message">All matched! Nice work.</p>}

        </div>

    );

}
