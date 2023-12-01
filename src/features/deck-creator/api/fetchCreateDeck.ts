import { CardData } from '../types';

type CreateDeckPayload = {
    title: string;
    category: string;
    cards: CardData[];
};

export async function fetchCreateDeck(payload: CreateDeckPayload) {
    console.log('payload', payload);

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
