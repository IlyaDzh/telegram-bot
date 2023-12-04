export interface CreateCardData {
    question: string;
    questionMode: string;
    answer: string;
    answerMode: string;
}

export interface CreateDeckData {
    title: string;
    category: string;
    cardsCount: number;
}
