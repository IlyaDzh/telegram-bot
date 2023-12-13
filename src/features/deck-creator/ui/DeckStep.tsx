import React, { FC, useCallback, useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, Heading } from '@chakra-ui/react';
import NextLink from 'next/link';

import { CreateDeckData } from '../types';
import { DEFAULT_MAX_CARD_COUNTS } from '../lib/DeckCreatorUtils';
import {
    DECK_CATEGORY_FIELD_NAME,
    DECK_TITLE_FIELD_NAME,
    DECK_CARDS_COUNT_FIELD_NAME,
    DeckCategoryField,
    DeckTitleField,
    DeckCardsCountField,
    DeckDifficultyField,
    DECK_DIFFICULTY_FIELD_NAME,
} from '@/entities/deck';
import { db } from '@/db';
import { ColumnLayout } from '@/shared/ui/layout';
import { Difficulty } from '@/types/deck';

type Props = {
    onSuccess: () => void;
};

const DeckStep: FC<Props> = ({ onSuccess }) => {
    const methods = useForm<CreateDeckData>({
        mode: 'onBlur',
        defaultValues: {
            cardsCount: DEFAULT_MAX_CARD_COUNTS,
            difficulty: Difficulty.Ease,
        },
    });

    useEffect(() => {
        const fetchDeckData = async () => {
            try {
                const deckData = await db.deck.toCollection().first();

                if (deckData) {
                    methods.setValue(DECK_TITLE_FIELD_NAME, deckData.title);
                    methods.setValue(DECK_CATEGORY_FIELD_NAME, deckData.category);
                    methods.setValue(DECK_DIFFICULTY_FIELD_NAME, deckData.difficulty);
                    methods.setValue(DECK_CARDS_COUNT_FIELD_NAME, deckData.cardsCount);
                }
            } catch {}
        };

        methods.reset();

        fetchDeckData();
    }, [methods]);

    const onSubmit: SubmitHandler<CreateDeckData> = useCallback(
        async values => {
            try {
                await db.deck.clear();
                await db.deck.put(values);

                onSuccess();
            } catch {}
        },
        [onSuccess],
    );

    return (
        <FormProvider {...methods}>
            <Heading as='h1' mb={8}>
                Создать колоду
            </Heading>

            <ColumnLayout as='form' onSubmit={methods.handleSubmit(onSubmit)}>
                <Box>
                    <DeckTitleField />
                    <DeckCategoryField />
                    <DeckDifficultyField />
                    <DeckCardsCountField />
                </Box>

                <Box display='grid' gap={2}>
                    <Button type='submit'>Далее</Button>
                    <NextLink href='/decks' passHref legacyBehavior>
                        <Button as='a'>На страницу колод</Button>
                    </NextLink>
                </Box>
            </ColumnLayout>
        </FormProvider>
    );
};

export default DeckStep;
