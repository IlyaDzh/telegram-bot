import axios from 'axios';

import { Card } from '@/types/card';

export async function fetchCards(deckId: string) {
    return await axios.get<Card[]>(`/api/getCards?deckId=${deckId}`);
}
