import { CardData } from '../types';
import { indexedDb } from './indexedDb';

interface GetDataByKeyFunction<T> {
    (...keys: any[]): Promise<T | null>;
}

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

            if (cards && cards.length > 0) {
                return cards.length + 1;
            }

            return 0;
        } catch (error) {
            throw new Error('Error fetching data from IndexedDB');
        }
    };
}
