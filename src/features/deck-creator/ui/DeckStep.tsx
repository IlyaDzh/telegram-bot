import React, { FC, useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Button, Heading } from '@chakra-ui/react';

import { DECK_CATEGORY_FIELD_NAME, DECK_TITLE_FIELD_NAME, DeckCategoryField, DeckTitleField } from '@/entities/deck';
import { db, DeckData } from '@/db';

type Props = {
    onSuccess: () => void;
};

const DeckStep: FC<Props> = ({ onSuccess }) => {
    const methods = useForm<DeckData>({ mode: 'onBlur' });

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
            <Heading>Колода</Heading>
            <Box
                as='form'
                onSubmit={methods.handleSubmit(submit)}
                h='100%'
                display='flex'
                flexDirection='column'
                justifyContent='space-between'
            >
                <Box mt={8}>
                    <DeckTitleField />
                    <DeckCategoryField />
                </Box>
                <Button type='submit'>Далее</Button>
            </Box>
        </FormProvider>
    );
};

export default DeckStep;
