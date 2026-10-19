import { Matching, Sorting } from "@/types/matching-sorting-types";

// Hardcoded demo data for the 'Try it' page
// This is temporary placeholder content; real content
// will come from backend/content system once that's built out

export const countryCapitalPairs: Matching[] = [
	{ id: "1", static: "Australia", draggable: "Canberra" },
	{ id: "2", static: "Zimbabwe", draggable: "Harare" },
	{ id: "3", static: "Ethiopia", draggable: "Addis Ababa" },
	{ id: "4", static: "Turkey", draggable: "Ankara" },
];

export const sortingFact: Sorting = { 
	id: "1",
	text: "The capital of Canada is Toronto.",
	isTrue: false, // It's Ottawa
};
