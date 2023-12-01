import React, { useEffect, useState } from 'react';
import { Spinner } from '@chakra-ui/react';

import { DeckData } from '@/db';
import { fetchDecks } from '../api/fetchDecks';

export const DeckList = () => {
    const [decks, setDecks] = useState<DeckData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchDecks().then(decks => {
            setIsLoading(false);
            setDecks(decks);
        });
    }, []);

    if (isLoading) {
        return <Spinner thickness='4px' emptyColor='gray.200' size='xl' margin='auto' />;
    }

    return (
        <div>
            {decks.map((deck, index) => (
                <div key={index}>{deck.title}</div>
            ))}
        </div>
    );
};
