import { Deck as BaseDeck } from '@/types/deck';

export interface Deck extends BaseDeck {
    questionsCount: number;
}
