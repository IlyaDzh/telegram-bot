import { db } from '@/db';
import { CreateCardData, CreateDeckData } from '../types';
import { fetchCreateDeck } from '../api/fetchCreateDeck';

export const MAX_QUESTIONS_COUNT = 3;

export class DeckCreatorUtils {
    static getCurrentStep = async () => {
        const cardsCount = await db.cards.count();
        const deck = await db.deck.toCollection().first();

        if (cardsCount > 0) {
            return cardsCount === MAX_QUESTIONS_COUNT ? MAX_QUESTIONS_COUNT : cardsCount + 1;
        }

        if (deck) {
            return 1;
        }

        return 0;
    };

    static createDeck = async () => {
        const cards = await db.cards.toArray();
        const deck = await db.deck.toCollection().first();

        await fetchCreateDeck(DeckCreatorUtils.formatCreatePayload(deck, cards));
    };

    static clearDB = () => {
        db.deck.clear();
        db.cards.clear();
    };

    private static formatCreatePayload = (deck?: CreateDeckData, cards?: CreateCardData[]) => {
        return {
            title: deck?.title || '',
            category: deck?.category || '',
            cards: (cards || []).map(card => ({
                question: card.question,
                questionMode: card.questionMode,
                answer: card.answer,
                answerMode: card.answerMode,
            })),
        };
    };
}
