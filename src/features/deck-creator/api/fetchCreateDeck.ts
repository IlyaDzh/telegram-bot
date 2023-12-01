import { CardData } from '@/db';

type CreateDeckPayload = {
    name: string;
    category: string;
    cards: CardData[];
};

export async function fetchCreateDeck(payload: CreateDeckPayload) {
    return await fetch('/api/createDeck', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            ...payload,
        }),
    }).then(res => res.json());
}
