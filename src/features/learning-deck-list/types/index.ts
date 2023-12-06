import { CardFieldMode } from '@/types/card';

export interface LearningDeck {
    id: string;
    deck: Deck;
    knownCards: Card[];
    unknownCards: Card[];
}

interface Card {
    id: string;
    question: string;
    questionMode: CardFieldMode;
    answer: string;
    answerMode: CardFieldMode;
}

interface Deck {
    id: string;
    title: string;
    category: string;
}
