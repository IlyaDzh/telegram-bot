import React, { FC, useCallback, useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, Heading } from '@chakra-ui/react';

import { CreateDeckData } from '../types';
import { DEFAULT_MAX_CARD_COUNTS } from '../lib/DeckCreatorUtils';
import {
    DECK_CATEGORY_FIELD_NAME,
    DECK_TITLE_FIELD_NAME,
    DECK_CARDS_COUNT_FIELD_NAME,
    DeckCategoryField,
    DeckTitleField,
    DeckCardsCountField,
} from '@/entities/deck';
import { db } from '@/db';
import { ColumnLayout } from '@/shared/ui/layout';

type Props = {
    onSuccess: () => void;
};

const DeckStep: FC<Props> = ({ onSuccess }) => {
    const methods = useForm<CreateDeckData>({
        mode: 'onBlur',
        defaultValues: {
            cardsCount: DEFAULT_MAX_CARD_COUNTS,
        },
    });

    useEffect(() => {
        const fetchDeckData = async () => {
            try {
                const deckData = await db.deck.toCollection().first();

                if (deckData) {
                    methods.setValue(DECK_TITLE_FIELD_NAME, deckData.title);
                    methods.setValue(DECK_CATEGORY_FIELD_NAME, deckData.category);
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
            <Heading as='h1'>Создать колоду</Heading>
            <ColumnLayout as='form' onSubmit={methods.handleSubmit(onSubmit)}>
                <Box mt={8}>
                    <DeckTitleField />
                    <DeckCategoryField />
                    <DeckCardsCountField />
                </Box>
                <Button type='submit'>Далее</Button>
            </ColumnLayout>
        </FormProvider>
    );
};

export default DeckStep;
