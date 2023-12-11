import axios from 'axios';

export async function fetchDeleteDeck(deckId: string) {
    return await axios.delete('/api/deleteDeck', {
        data: {
            deckId,
        },
    });
}
