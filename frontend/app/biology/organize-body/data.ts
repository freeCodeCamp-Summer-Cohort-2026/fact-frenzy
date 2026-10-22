import { Question } from "@/types/questions";

export const bodySystemPairs: Question[] = [
	{ id: 13, text: "Alveoli", options: [{ id: 17, text: "Respiratory System" }] },
	{ id: 14, text: "Kidneys", options: [{ id: 18, text: "Urinary System" }] },
	{ id: 15, text: "Small Intestine", options: [{ id: 19, text: "Digestive System" }] },
	{ id: 16, text: "Spinal Cord", options: [{ id: 20, text: "Nervous System" }] },
];

export const bodySorting: Question[] = [
    {
	id: 17,
	text: "The human body has 206 bones as an adult.",
	options: [
        { id: 21, text: "True" },
        { id: 22, text: "Untrue"}
        ]
    },
    {
    id: 18,
    text: "Humans have four lungs.",
    options: [
        { id: 23, text: "True" },
        { id: 24, text: "Untrue"}
        ]
    }
]
