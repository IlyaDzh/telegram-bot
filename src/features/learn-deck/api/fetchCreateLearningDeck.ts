type CreateLearningDeckPayload = {
    deckId: string;
    knownIds: string[];
    unknownIds: string[];
};

export async function fetchCreateLearningDeck(payload: CreateLearningDeckPayload) {
    return await fetch('/api/createLearningDeck', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            ...payload,
        }),
    }).then(res => res.json());
}
