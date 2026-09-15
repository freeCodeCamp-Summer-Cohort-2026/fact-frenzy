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
        <div className="flex flex-col gap-6 max-w-2xl mx-auto p-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Match each capital to its country
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {shuffledPairs.map((pair)=>{
                    // after a capital has been matched successfully, hide it from the draggable pool
                    if (matched[pair.id]) return null;

                    return (
                        <div
                        key={pair.id}
						draggable
                        onDragStart={(e) => handleDragStart(e, pair.id)}
						className="p-3 bg-slate-800 text-white rounded-lg text-center font-medium cursor-grab active:cursor-grabbing shadow hover:bg-slate-700 transition-colors select-none"
                        >
                            {pair.capital}
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {countryCapitalPairs.map((pair)=>{
                    const isMatched=matched[pair.id]
                    const state=feedback[pair.id]

                    let zoneStyle = "border-2 border-dashed border-slate-400 dark:border-slate-600 bg-slate-100 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100";
                    if (isMatched || state === "correct") zoneStyle = "border-2 border-solid border-emerald-500 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200";
                    if (state === "wrong") zoneStyle = "border-2 border-solid border-rose-500 bg-rose-100 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200";

                    return (
                        <div
                        key={pair.id}
                        onDragOver={(e) => !isMatched && handleDragOver(e)}
                        onDrop={(e)=>handleDrop(e, pair.id)}
                        className={`p-3 rounded-lg text-center text-sm font-semibold flex flex-col items-center justify-center min-h-16 transition-colors ${zoneStyle}`}
                        >
                            <span>{pair.country}</span>
                            {isMatched && <span className="text-xs mt-1 text-emerald-700 dark:text-emerald-400">→ {pair.capital}</span>}
                        </div>
                    )
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
