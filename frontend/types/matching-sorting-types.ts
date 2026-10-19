// Types used for matching & sorting exercises
// The "draggable" field is for the cards that can be dragged
// The "static" field is for those that you drag onto to match

export interface Matching {
	id: string;
	draggable: string; 
	static: string; 
}

export interface Sorting {
	id: string;
	text: string;
	isTrue: boolean;
}
