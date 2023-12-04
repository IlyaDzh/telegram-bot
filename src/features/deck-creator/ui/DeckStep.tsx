import React, { FC, useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Button, Heading } from '@chakra-ui/react';

import { DECK_CATEGORY_FIELD_NAME, DECK_TITLE_FIELD_NAME, DeckCategoryField, DeckTitleField } from '@/entities/deck';
import { db } from '@/db';
import { CreateDeckData } from '../types';
import { ColumnLayout } from '@/shared/ui/layout';

type Props = {
    onSuccess: () => void;
};

const DeckStep: FC<Props> = ({ onSuccess }) => {
    const methods = useForm<CreateDeckData>({ mode: 'onBlur' });

    useEffect(() => {
        const setDeckData = async () => {
            const deckData = await db.deck.toCollection().first();

            if (deckData) {
                methods.reset();

                methods.setValue(DECK_TITLE_FIELD_NAME, deckData.title);
                methods.setValue(DECK_CATEGORY_FIELD_NAME, deckData.category);
            }
        };

        methods.reset();

        setDeckData();
    }, [methods]);

    const submit = useCallback(async () => {
        try {
            await db.deck.clear();
            await db.deck.put(methods.getValues());

            onSuccess();
        } catch {}
    }, [methods, onSuccess]);

    return (
        <FormProvider {...methods}>
            <Heading as='h1'>Колода</Heading>
            <ColumnLayout as='form' onSubmit={methods.handleSubmit(submit)}>
                <Box mt={8}>
                    <DeckTitleField />
                    <DeckCategoryField />
                </Box>
                <Button type='submit'>Далее</Button>
            </ColumnLayout>
        </FormProvider>
    );
};

export default DeckStep;
