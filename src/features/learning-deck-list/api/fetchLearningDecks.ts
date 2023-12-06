import { LearningDeck } from '../types';

export async function fetchLearningDecks(): Promise<LearningDeck[]> {
    return await fetch('/api/getLearningDecks', {
        method: 'GET',
    }).then(res => res.json());
}
