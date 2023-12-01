import Dexie, { Table } from 'dexie';

export interface CardData {
    id?: number;
    question: string;
    questionMode: string;
    answer: string;
    answerMode: string;
}

export interface DeckData {
    title: string;
    category: string;
}

export class IndexedDBWrapper extends Dexie {
    cards!: Table<CardData>;
    deck!: Table<DeckData>;

    constructor() {
        super('myDatabase');

        this.version(1).stores({
            cards: 'id, question, questionMode, answer, answerMode',
            deck: 'title, category',
        });
    }
}

export const db = new IndexedDBWrapper();
