export async function fetchCards(deckId: string) {
    return await fetch(`/api/getCards?deckId=${deckId}`, {
        method: 'GET',
    }).then(res => res.json());
}
