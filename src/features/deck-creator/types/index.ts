export type CardData = {
    question: string;
    questionMode: string;
    answer: string;
    answerMode: string;
};

export type DeckData = {
    title: string;
    category: string;
};

export enum CardFieldMode {
    Text = 'text',
    Code = 'code',
}
