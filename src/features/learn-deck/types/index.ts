import { CardFieldMode } from '@/types/card';

export interface Card {
    id: string;
    question: string;
    questionMode: CardFieldMode;
    answer: string;
    answerMode: CardFieldMode;
}
