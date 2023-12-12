import axios from 'axios';

import { CreateCardData } from '../types';
import { Difficulty } from '@/types/deck';

type CreateDeckPayload = {
    title: string;
    category: string;
    difficulty: Difficulty;
    cards: CreateCardData[];
};

export async function fetchCreateDeck(payload: CreateDeckPayload) {
    return await axios.post('/api/createDeck', payload);
}
