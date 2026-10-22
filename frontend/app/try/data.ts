import { Question } from "@/types/questions";

// Hardcoded demo data for the 'Try it' page
// This is temporary placeholder content; real content
// will come from backend/content system once that's built out

// changed the data shape here to fit the shape from the API.
// the ids here are made up; they don't come from the backend data

export const countryCapitalPairs: Question[] = [
	{ id: 1, text: "Australia", options: [{ id: 10, text: "Canberra" }] },
	{ id: 2, text: "Zimbabwe", options: [{ id: 20, text: "Harare" }] },
	{ id: 3, text: "Ethiopia", options: [{ id: 30, text: "Addis Ababa" }] },
	{ id: 4, text: "Turkey", options: [{ id: 40, text: "Ankara" }] },
];

export const sortingFact: Question[] = [
	{
	id: 5,
	text: "The capital of Canada is Toronto.",
	options: [
		{ id: 50, text: "True" },
		{ id: 60, text: "False" },
		],
	},
]
