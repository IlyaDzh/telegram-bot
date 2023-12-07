import { Card } from '@/types/card';

export async function fetchCards(deckId: string): Promise<Card[]> {
    return await fetch(`/api/getCards?deckId=${deckId}`, {
        method: 'GET',
    }).then(res => res.json());
}
