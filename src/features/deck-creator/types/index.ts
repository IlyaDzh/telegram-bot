export type CardData = {
    cardQuestion: string;
    cardQuestionMode: string;
    cardAnswer: string;
    cardAnswerMode: string;
};

export type DeckData = {
    deckTitle: string;
    deckCategory: string;
};

export enum CardFieldMode {
    Text = 'text',
    Code = 'code',
}
