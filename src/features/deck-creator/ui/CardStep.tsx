import React, { FC, useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { CARD_ANSWER_FIELD_NAME, CARD_QUESTION_FIELD_NAME, CardAnswerField, CardQuestionField } from '@/entities/card';
import { indexedDb } from '../lib/indexedDb';
import { DeckUtils } from '../lib/DeckUtils';

type Props = {
    cardIndex: number;
    onNextStep: () => void;
    onPrevStep: () => void;
    onSaveDeck: () => void;
    onClose: () => void;
};

type CardData = {
    cardQuestion: string;
    cardAnswer: string;
};

const CardStep: FC<Props> = ({ cardIndex, onNextStep, onPrevStep, onSaveDeck, onClose }) => {
    const methods = useForm<CardData>({ mode: 'onBlur' });

    const isLastCard = cardIndex === 20;

    useEffect(() => {
        const getCardData = async () => {
            await DeckUtils.fetchDataFromIndexedDB<CardData>(indexedDb.getDataByKey, [cardIndex], cardData => {
                methods.setValue(CARD_QUESTION_FIELD_NAME, cardData.cardQuestion);
                methods.setValue(CARD_ANSWER_FIELD_NAME, cardData.cardAnswer);
            });
        };

        methods.reset();

        getCardData();
    }, [cardIndex, methods]);

    const submit = useCallback(async () => {
        try {
            await indexedDb.addData(cardIndex, methods.getValues());

            if (isLastCard) {
                onSaveDeck();
            } else {
                onNextStep();
            }
        } catch {}
    }, [cardIndex, methods, isLastCard, onNextStep, onSaveDeck]);

    return (
        <FormProvider {...methods}>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Heading as='h1' size='md'>
                    Карта {cardIndex}
                </Heading>
                <Text size='sm'>{cardIndex}/20</Text>
                <Button size='md' onClick={onClose}>
                    Отменить
                </Button>
            </Box>
            <Box
                as='form'
                onSubmit={methods.handleSubmit(submit)}
                h='100%'
                display='flex'
                flexDirection='column'
                justifyContent='space-between'
            >
                <Box mt={8}>
                    <CardQuestionField />
                    <CardAnswerField />
                </Box>
                <Box display='grid' gap={2}>
                    {isLastCard ? <Button type='submit'>Сохранить</Button> : <Button type='submit'>Далее</Button>}
                    <Button onClick={onPrevStep}>Назад</Button>
                </Box>
            </Box>
        </FormProvider>
    );
};

export default CardStep;
