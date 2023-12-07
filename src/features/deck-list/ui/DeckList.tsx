import React, { useEffect, useMemo, useState } from 'react';
import { Box, Heading, Input } from '@chakra-ui/react';

import { Spinner } from '@/shared/ui/spinner';
import { fetchDecks } from '../api/fetchDecks';
import { Deck } from '../types';
import { DeckCard } from './DeckCard';
import { NotFoundAlert } from './NotFoundAlert';

export const DeckList = () => {
    const [decks, setDecks] = useState<Deck[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        setIsLoading(true);

        fetchDecks()
            .then(({ data }) => {
                setDecks(data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const filteredDecks = useMemo(
        () => decks.filter(deck => deck.title.toLowerCase().includes(searchValue.toLowerCase())),
        [decks, searchValue],
    );

    const displayedDecks = searchValue ? filteredDecks : decks;

    return (
        <Box>
            <Box display='grid' gap={3} mb={8}>
                <Heading as='h1'>Список колод</Heading>

                <Input onChange={handleSearchChange} value={searchValue} placeholder='Поиск' />
            </Box>

            {isLoading && (
                <Box display='grid'>
                    <Spinner />
                </Box>
            )}

            {decks.length === 0 && !isLoading && <NotFoundAlert />}

            {!isLoading && (
                <Box display='grid' gap={6} mb={5}>
                    {displayedDecks.map((deck, index) => (
                        <DeckCard key={index} {...deck} />
                    ))}
                </Box>
            )}
        </Box>
    );
};
