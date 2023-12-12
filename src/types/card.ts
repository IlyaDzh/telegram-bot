export enum CardFieldMode {
    Text = 'Text',
    Code = 'Code',
}

export interface Card {
    id: string;
    question: string;
    questionMode: CardFieldMode;
    answer: string;
    answerMode: CardFieldMode;
}
