import { CardData, DeckData } from '../types';
import { indexedDb } from './indexedDb';

interface GetDataByKeyFunction<T> {
    (...keys: any[]): Promise<T | null>;
}

export const MAX_QUESTIONS_COUNT = 3;

export class DeckUtils {
    static fetchDataFromIndexedDB = async <T>(
        getDataByKeyFunction: GetDataByKeyFunction<unknown>,
        keys: any[],
        setValueFunction: (data: T) => void,
    ) => {
        try {
            const data = (await getDataByKeyFunction(...keys)) as T;

            if (data) {
                setValueFunction(data);
            }
        } catch (error) {
            throw new Error('Error fetching data from IndexedDB');
        }
    };

    static getCurrentStep = async () => {
        try {
            const cards = (await indexedDb.getDataByKey('cards')) as CardData[];
            const deck = (await indexedDb.getDataByKey('deck-fields')) as DeckData;

            if (cards && cards.length > 0) {
                return cards.length === MAX_QUESTIONS_COUNT ? MAX_QUESTIONS_COUNT : cards.length + 1;
            } else if (deck) {
                return 1;
            }

            return 0;
        } catch (error) {
            throw new Error('Error fetching data from IndexedDB');
        }
    };

    static formatCreateDeckPayload = (data: [cards: CardData[], deckFields: DeckData]) => {
        return {
            title: data[1].deckTitle,
            category: data[1].deckCategory,
            cards: data[0].map(card => ({ question: card.cardQuestion, answer: card.cardAnswer })),
        };
    };
}
