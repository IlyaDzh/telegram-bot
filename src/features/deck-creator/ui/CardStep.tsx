import React, { FC, useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Button, Heading, Text } from '@chakra-ui/react';

import {
    CARD_ANSWER_FIELD_MODE,
    CARD_ANSWER_FIELD_NAME,
    CARD_QUESTION_FIELD_MODE,
    CARD_QUESTION_FIELD_NAME,
    CardAnswerField,
    CardQuestionField,
} from '@/entities/card';
import { indexedDb } from '../lib/indexedDb';
import { DeckUtils, MAX_QUESTIONS_COUNT } from '../lib/DeckUtils';
import { CardData, CardFieldMode } from '../types';

type Props = {
    cardIndex: number;
    onNextStep: () => void;
    onPrevStep: () => void;
    onSaveDeck: () => void;
    onClose: () => void;
};

const CardStep: FC<Props> = ({ cardIndex, onNextStep, onPrevStep, onSaveDeck, onClose }) => {
    const methods = useForm<CardData>({
        mode: 'onBlur',
        defaultValues: {
            questionMode: CardFieldMode.Text,
            answerMode: CardFieldMode.Text,
        },
    });

    const isLastCard = cardIndex === MAX_QUESTIONS_COUNT;

    useEffect(() => {
        const getCardData = async () => {
            await DeckUtils.fetchDataFromIndexedDB<CardData[]>(indexedDb.getDataByKey, ['cards'], cardData => {
                const currentIndex = cardIndex - 1;

                if (cardData[currentIndex]) {
                    methods.setValue(CARD_QUESTION_FIELD_NAME, cardData[currentIndex].question);
                    methods.setValue(CARD_QUESTION_FIELD_MODE, cardData[currentIndex].questionMode);
                    methods.setValue(CARD_ANSWER_FIELD_NAME, cardData[currentIndex].answer);
                    methods.setValue(CARD_ANSWER_FIELD_MODE, cardData[currentIndex].answerMode);
                }
            });
        };

        methods.reset();

        getCardData();
    }, [cardIndex, methods]);

    const submit = useCallback(async () => {
        try {
            const data = ((await indexedDb.getDataByKey('cards')) || []) as CardData[];
            data[cardIndex - 1] = methods.getValues();
            await indexedDb.addData('cards', data);

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
                <Text size='sm'>
                    {cardIndex}/{MAX_QUESTIONS_COUNT}
                </Text>
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
