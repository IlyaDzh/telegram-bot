import { ECardFieldMode } from '@/enums';

export interface Card {
    id: string;
    question: string;
    questionMode: ECardFieldMode;
    answer: string;
    answerMode: ECardFieldMode;
}
