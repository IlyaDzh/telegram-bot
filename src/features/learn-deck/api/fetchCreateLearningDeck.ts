import axios from 'axios';

type CreateLearningDeckPayload = {
    deckId: string;
    knownIds: string[];
    unknownIds: string[];
};

export async function fetchCreateLearningDeck(payload: CreateLearningDeckPayload) {
    return await axios.post('/api/createLearningDeck', payload);
}
