import { Card } from '@/types/card';
import { Deck } from '@/types/deck';

export interface LearningDeck {
    id: string;
    deck: Deck;
    knownCards: Card[];
    unknownCards: Card[];
}
