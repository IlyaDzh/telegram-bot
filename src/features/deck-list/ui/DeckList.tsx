import React, { useEffect, useState } from 'react';
import { Box, Spinner } from '@chakra-ui/react';

import { DeckCard } from './DeckCard';
import { Deck } from '../types';
import { fetchDecks } from '../api/fetchDecks';

export const DeckList = () => {
    const [decks, setDecks] = useState<Deck[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchDecks().then(decks => {
            setDecks(decks);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <Spinner thickness='4px' emptyColor='gray.200' size='xl' margin='auto' />;
    }

    return (
        <Box display='grid' gap={6}>
            {decks.map((deck, index) => (
                <DeckCard key={index} {...deck} />
            ))}
        </Box>
    );
};
