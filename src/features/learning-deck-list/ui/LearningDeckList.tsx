import React, { useEffect, useState } from 'react';
import { Box, Heading } from '@chakra-ui/react';

import { Spinner } from '@/shared/ui/spinner';
import { fetchLearningDecks } from '../api/fetchLearningDecks';
import { LearningDeck } from '../types';
import { LearningDeckCard } from './LearningDeckCard';
import { NotFoundAlert } from './NotFoundAlert';

export const LearningDeckList = () => {
    const [decks, setDecks] = useState<LearningDeck[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchLearningDecks().then(({ data }) => {
            setDecks(data);
            setIsLoading(false);
        });
    }, []);

    return (
        <Box>
            <Heading as='h1' mb={6}>
                Изучаемые колоды
            </Heading>

            {isLoading && (
                <Box display='grid'>
                    <Spinner />
                </Box>
            )}

            {decks.length === 0 && !isLoading && <NotFoundAlert />}

            {!isLoading && (
                <Box display='grid' gap={6} mb={5}>
                    {decks.map((deck, index) => (
                        <LearningDeckCard key={index} {...deck} />
                    ))}
                </Box>
            )}
        </Box>
    );
};
