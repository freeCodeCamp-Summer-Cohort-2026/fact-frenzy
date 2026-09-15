// Hardcoded demo data for the 'Try it' page
// This is temporary placeholder content; real content
// will come from backend/content system once that's built out

export interface CountryCapitalPair {
    id: string,
    country: string,
    capital: string
}

export const countryCapitalPairs: CountryCapitalPair[] = [
	{ id: "1", country: "Australia", capital: "Canberra" },
	{ id: "2", country: "Zimbabwe", capital: "Harare" },
	{ id: "3", country: "Ethiopia", capital: "Addis Ababa" },
	{ id: "4", country: "Turkey", capital: "Ankara" },
];

export interface SortingFact {
    id: string,
    text: string,
    isTrue: boolean
}

export const sortingFact: SortingFact = {
    id: "1",
    text: "The capital of Canada is Toronto.",
    isTrue: false // It's Ottawa
}
