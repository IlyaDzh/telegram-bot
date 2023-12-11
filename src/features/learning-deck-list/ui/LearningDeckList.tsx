import React, { useEffect, useState } from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';
import NextLink from 'next/link';

import { Spinner } from '@/shared/ui/spinner';
import { fetchLearningDecks } from '../api/fetchLearningDecks';
import { LearningDeck } from '../types';
import { LearningDeckCard } from './LearningDeckCard';
import { NotFoundAlert } from './NotFoundAlert';
import { ColumnLayout } from '@/shared/ui/layout';

export const LearningDeckList = () => {
    const [decks, setDecks] = useState<LearningDeck[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchLearningDecks()
            .then(({ data }) => {
                setDecks(data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <ColumnLayout>
            <Box mb={5}>
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
                    <Box display='grid' gap={6}>
                        {decks.map((deck, index) => (
                            <LearningDeckCard key={index} {...deck} />
                        ))}
                    </Box>
                )}
            </Box>

            <NextLink href='/decks' passHref legacyBehavior>
                <Button as='a'>На страницу колод</Button>
            </NextLink>
        </ColumnLayout>
    );
};
