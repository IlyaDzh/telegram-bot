import axios from 'axios';

import { CreateCardData } from '../types';

type CreateDeckPayload = {
    title: string;
    category: string;
    cards: CreateCardData[];
};

export async function fetchCreateDeck(payload: CreateDeckPayload) {
    return await axios.post('/api/createDeck', payload);
}
