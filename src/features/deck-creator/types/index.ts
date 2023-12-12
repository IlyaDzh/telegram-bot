import { CardFieldMode } from '@/types/card';
import { Difficulty } from '@/types/deck';

export interface CreateCardData {
    question: string;
    questionMode: CardFieldMode;
    answer: string;
    answerMode: CardFieldMode;
}

export interface CreateDeckData {
    title: string;
    category: string;
    difficulty: Difficulty;
    cardsCount: number;
}
