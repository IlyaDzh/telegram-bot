import Dexie, { Table } from 'dexie';
import { CreateCardData, CreateDeckData } from './types';

type WithId<T> = T & {
    id: number;
};

export class IndexedDBWrapper extends Dexie {
    cards!: Table<WithId<CreateCardData>>;
    deck!: Table<CreateDeckData>;

    constructor() {
        super('myDatabase');

        this.version(1).stores({
            cards: 'id, question, questionMode, answer, answerMode',
            deck: 'title, category',
        });
    }
}

export const db = new IndexedDBWrapper();
