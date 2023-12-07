import React, { useEffect, useState } from 'react';
import { Box, Heading } from '@chakra-ui/react';

import { Spinner } from '@/shared/ui/spinner';
import { fetchDecks } from '../api/fetchDecks';
import { Deck } from '../types';
import { DeckCard } from './DeckCard';
import { NotFoundAlert } from './NotFoundAlert';

export const DeckList = () => {
    const [decks, setDecks] = useState<Deck[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchDecks().then(({ data }) => {
            setDecks(data);
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
            <Heading as='h1'>Список колод</Heading>

            {decks.map((deck, index) => (
                <DeckCard key={index} {...deck} />
            ))}
        </Box>
    );
};
