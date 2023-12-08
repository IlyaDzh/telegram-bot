export interface Deck {
    id: string;
    title: string;
    category: string;
    difficulty: Difficulty;
}

export enum Difficulty {
    ease = 0,
    medium = 1,
    hard = 2,
}
