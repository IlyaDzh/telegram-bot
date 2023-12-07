export enum CardFieldMode {
    Text = 'text',
    Code = 'code',
}

export interface Card {
    id: string;
    question: string;
    questionMode: CardFieldMode;
    answer: string;
    answerMode: CardFieldMode;
}
