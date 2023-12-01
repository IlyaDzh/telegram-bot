import { DeckData, CardData } from '@/db';

export const MAX_QUESTIONS_COUNT = 3;

export class DeckUtils {
    static getCurrentStep = (deck?: DeckData, cards?: CardData[]) => {
        if (cards && cards.length > 0) {
            return cards.length === MAX_QUESTIONS_COUNT ? MAX_QUESTIONS_COUNT : cards.length + 1;
        }

        if (deck) {
            return 1;
        }

        return 0;
    };

    static formatCreateDeckPayload = (deck?: DeckData, cards?: CardData[]) => {
        return {
            name: deck?.title || '',
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
