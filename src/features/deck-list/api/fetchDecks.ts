import axios from 'axios';

import { Deck } from '../types';

export async function fetchDecks() {
    return await axios.get<Deck[]>('/api/getDecks');
}
