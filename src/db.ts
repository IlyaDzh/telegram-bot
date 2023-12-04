import Dexie, { Table } from 'dexie';

import { CreateCardData, CreateDeckData } from './features/deck-creator/types';

type WithId<T> = T & {
    id: number;
};

export class IndexedDBWrapper extends Dexie {
    cards!: Table<WithId<CreateCardData>>;
    deck!: Table<CreateDeckData>;

    constructor() {
        super('db');

        this.version(1).stores({
            cards: 'id, question, questionMode, answer, answerMode',
            deck: 'title, category, cardsCount',
        });
    }
}

export const db = new IndexedDBWrapper();
