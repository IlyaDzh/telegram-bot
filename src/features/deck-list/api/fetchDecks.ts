export async function fetchDecks() {
    return await fetch('/api/getDecks', {
        method: 'GET',
    }).then(res => res.json());
}
