import { Deck } from '../types';

export async function fetchDecks(): Promise<Deck[]> {
    return await fetch('/api/getDecks', {
        method: 'GET',
    }).then(res => res.json());
}
