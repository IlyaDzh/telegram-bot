import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, Heading, useDisclosure } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import NextLink from 'next/link';

import { Spinner } from '@/shared/ui/spinner';
import { ColumnLayout } from '@/shared/ui/layout';
import { useTelegram } from '@/hooks/useTelegram';
import { Role } from '@/types/user';
import { Difficulty } from '@/types/deck';
import { fetchDecks } from '../api/fetchDecks';
import { fetchDeleteDeck } from '../api/fetchDeleteDeck';
import { Deck } from '../types';
import { DeckCard } from './DeckCard';
import { NotFoundAlert } from './NotFoundAlert';
import { DeckDeleteModal } from './DeckDeleteModal';
import {
    DECK_FILTER_DIFFICULTY_FIELD_NAME,
    DECK_FILTER_NEW_FIELD_NAME,
    DECK_FILTER_SEARCH_FIELD_NAME,
    DeckFilters,
} from './DeckFilters';

export const DeckList = () => {
    const { user } = useTelegram();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [decks, setDecks] = useState<Deck[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deletedDeckId, setDeletedDeckId] = useState<null | string>(null);

    const methods = useForm({
        mode: 'onBlur',
        defaultValues: {
            [DECK_FILTER_SEARCH_FIELD_NAME]: '',
            [DECK_FILTER_DIFFICULTY_FIELD_NAME]: Difficulty.All,
            [DECK_FILTER_NEW_FIELD_NAME]: false,
        },
    });

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

    const [searchValue, difficultyValue, onlyNewValue] = methods.watch([
        DECK_FILTER_SEARCH_FIELD_NAME,
        DECK_FILTER_DIFFICULTY_FIELD_NAME,
        DECK_FILTER_NEW_FIELD_NAME,
    ]);

    const displayedDecks = useMemo(() => {
        return decks.filter(deck => {
            const titleMatches = !searchValue || deck.title.toLowerCase().includes(searchValue.toLowerCase());
            const difficultyMatches = difficultyValue === Difficulty.All || deck.difficulty === difficultyValue;
            const isNewMatches = !onlyNewValue || deck.isNew === onlyNewValue;

            return titleMatches && difficultyMatches && isNewMatches;
        });
    }, [decks, searchValue, difficultyValue, onlyNewValue]);

    return (
        <ColumnLayout>
            <Box mb={5}>
                <Box display='grid' gap={3} mb={8}>
                    <Heading as='h1'>Список колод</Heading>

                    <FormProvider {...methods}>
                        <DeckFilters />
                    </FormProvider>
                </Box>

                {isLoading && (
                    <Box display='grid'>
                        <Spinner />
                    </Box>
                )}

                {decks.length === 0 && !isLoading && <NotFoundAlert />}

                {!isLoading && (
                    <Box display='grid' gap={6}>
                        {displayedDecks.map((deck, index) => {
                            const canDelete = user?.role === Role.Admin || deck.authorId === user?.userId;

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
                {user && user.role === Role.Admin && (
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
