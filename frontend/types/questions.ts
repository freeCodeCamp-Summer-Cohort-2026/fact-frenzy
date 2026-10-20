// Types used for matching & sorting exercises: 
// both use just questions and options

export interface Question {
	id: number;
	text: string;
	options: Option[];
}

export interface Option {
	id: number;
	text: string;
}
