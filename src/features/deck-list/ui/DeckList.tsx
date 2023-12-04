import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';

import { Spinner } from '@/shared/ui/spinner';
import { fetchDecks } from '../api/fetchDecks';
import { Deck } from '../types';
import { DeckCard } from './DeckCard';
import { NotFoundAlert } from './NotFoundAlert';

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
        return <Spinner />;
    }

    if (decks.length === 0) {
        return <NotFoundAlert />;
    }

    return (
        <Box display='grid' gap={6}>
            {decks.map((deck, index) => (
                <DeckCard key={index} {...deck} />
            ))}
        </Box>
    );
};