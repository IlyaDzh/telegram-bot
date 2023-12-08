import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, Heading, Input } from '@chakra-ui/react';
import NextLink from 'next/link';

import { Spinner } from '@/shared/ui/spinner';
import { fetchDecks } from '../api/fetchDecks';
import { Deck } from '../types';
import { DeckCard } from './DeckCard';
import { NotFoundAlert } from './NotFoundAlert';
import { ColumnLayout } from '@/shared/ui/layout';
import { useTelegram } from '@/hooks/useTelegram';
import { Role } from '@/types/user';

export const DeckList = () => {
    const { user } = useTelegram();
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
        <ColumnLayout>
            <Box mb={5}>
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

            <Box display="grid" gap={2}>
                {user && user.role === Role.admin && (
                    <NextLink href='/' passHref legacyBehavior>
                        <Button as='a' width='100%'>
                            Создать колоду
                        </Button>
                    </NextLink>
                )}

                <NextLink href='/decks' passHref legacyBehavior>
                    <Button as='a'>На страницу изучаемых колод</Button>
                </NextLink>
            </Box>
        </ColumnLayout>
    );
};
