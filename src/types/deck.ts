export interface Deck {
    id: string;
    title: string;
    category: string;
    difficulty: Difficulty;
}

export enum Difficulty {
    All = 'All',
    Ease = 'Ease',
    Medium = 'Medium',
    Hard = 'Hard',
}
