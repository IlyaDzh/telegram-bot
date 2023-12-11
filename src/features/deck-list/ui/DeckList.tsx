import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, Heading, Input, useDisclosure } from '@chakra-ui/react';
import NextLink from 'next/link';

import { Spinner } from '@/shared/ui/spinner';
import { ColumnLayout } from '@/shared/ui/layout';
import { useTelegram } from '@/hooks/useTelegram';
import { Role } from '@/types/user';
import { fetchDecks } from '../api/fetchDecks';
import { fetchDeleteDeck } from '../api/fetchDeleteDeck';
import { Deck } from '../types';
import { DeckCard } from './DeckCard';
import { NotFoundAlert } from './NotFoundAlert';
import { DeckDeleteModal } from './DeckDeleteModal';

export const DeckList = () => {
    const { user } = useTelegram();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [decks, setDecks] = useState<Deck[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [deletedDeckId, setDeletedDeckId] = useState<null | string>(null);

    useEffect(() => {
        fetchDecks()
            .then(({ data }) => {
                setDecks(data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const handleDeleteDeck = (id: string) => {
        setDeletedDeckId(id);
        onOpen();
    };

    const handleSubmitDeleteDeck = () => {
        if (!deletedDeckId) return;

        fetchDeleteDeck(deletedDeckId).then(() => {
            setDecks(prev => prev.filter(deck => deck.id !== deletedDeckId));
            setDeletedDeckId(null);
            onClose();
        });
    };

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
                        {displayedDecks.map((deck, index) => {
                            const canDelete = user?.role === Role.admin || deck.authorId === user?.userId;

                            return (
                                <DeckCard
                                    key={index}
                                    {...deck}
                                    onDelete={canDelete ? () => handleDeleteDeck(deck.id) : undefined}
                                />
                            );
                        })}
                    </Box>
                )}
            </Box>

            <Box display='grid' gap={2}>
                {user && user.role === Role.admin && (
                    <NextLink href='/' passHref legacyBehavior>
                        <Button as='a' width='100%'>
                            Создать колоду
                        </Button>
                    </NextLink>
                )}

                <NextLink href='/learning-decks' passHref legacyBehavior>
                    <Button as='a'>На страницу изучаемых колод</Button>
                </NextLink>
            </Box>

            <DeckDeleteModal isOpen={isOpen} onClose={onClose} onSubmit={handleSubmitDeleteDeck} />
        </ColumnLayout>
    );
};
