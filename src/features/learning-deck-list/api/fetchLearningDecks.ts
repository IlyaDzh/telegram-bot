import axios from 'axios';

import { LearningDeck } from '../types';

export async function fetchLearningDecks() {
    return await axios.get<LearningDeck[]>('/api/getLearningDecks');
}
