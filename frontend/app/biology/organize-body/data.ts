import { Matching, Sorting } from "@/types/matching-sorting-types";

export const bodySystemPairs: Matching[] = [
    { id: "1", static: "Respiratory System", draggable: "Alveoli" },
    { id: "2", static: "Urinary System", draggable: "Kidneys" },
    { id: "3", static: "Digestive System", draggable: "Small Intestine" },
    { id: "4", static: "Nervous System", draggable: "Spinal Cord" },
];

// TODO: create a list and add the other sorting fact below for this lab
// Do this after fix SortingExercise.tsx to take a list

export const bodySorting: Sorting = { 
    id: "1",
    text: "The human body has 206 bones as an adult.",
    isTrue: true, 
};


