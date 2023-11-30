import React, { FC, useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Button, Heading } from '@chakra-ui/react';

import { DECK_CATEGORY_FIELD_NAME, DECK_TITLE_FIELD_NAME, DeckCategoryField, DeckTitleField } from '@/entities/deck';
import { indexedDb } from '../lib/indexedDb';
import { DeckUtils } from '../lib/DeckUtils';
import { DeckData } from '../types';

type Props = {
    onSuccess: () => void;
};

const DeckStep: FC<Props> = ({ onSuccess }) => {
    const methods = useForm<DeckData>({ mode: 'onBlur' });

    useEffect(() => {
        const getDeckData = async () => {
            await DeckUtils.fetchDataFromIndexedDB<DeckData>(indexedDb.getDataByKey, ['deck-fields'], deckData => {
                methods.setValue(DECK_TITLE_FIELD_NAME, deckData.deckTitle);
                methods.setValue(DECK_CATEGORY_FIELD_NAME, deckData.deckCategory);
            });
        };

        methods.reset();

        getDeckData();
    }, [methods]);

    const submit = useCallback(async () => {
        try {
            await indexedDb.addData('deck-fields', methods.getValues());

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
