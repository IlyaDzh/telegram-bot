import React, { FC, useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Button, Heading, Text } from '@chakra-ui/react';

import { MAX_QUESTIONS_COUNT } from '../lib/DeckCreatorUtils';
import { CreateCardData } from '../types';
import {
    CARD_ANSWER_FIELD_MODE,
    CARD_ANSWER_FIELD_NAME,
    CARD_QUESTION_FIELD_MODE,
    CARD_QUESTION_FIELD_NAME,
    CardAnswerField,
    CardQuestionField,
} from '@/entities/card';
import { ColumnLayout } from '@/shared/ui/layout';
import { db } from '@/db';
import { ECardFieldMode } from '@/enums';

type Props = {
    cardIndex: number;
    onNextStep: () => void;
    onPrevStep: () => void;
    onSaveDeck: () => void;
    onClose: () => void;
};

const CardStep: FC<Props> = ({ cardIndex, onNextStep, onPrevStep, onSaveDeck, onClose }) => {
    const methods = useForm<CreateCardData>({
        mode: 'onBlur',
        defaultValues: {
            questionMode: ECardFieldMode.Text,
            answerMode: ECardFieldMode.Text,
        },
    });

    const isLastCard = cardIndex === MAX_QUESTIONS_COUNT;

    useEffect(() => {
        const setCardData = async () => {
            const currentCard = await db.cards.where({ id: cardIndex }).first();

            if (currentCard) {
                methods.setValue(CARD_QUESTION_FIELD_NAME, currentCard.question);
                methods.setValue(CARD_QUESTION_FIELD_MODE, currentCard.questionMode);
                methods.setValue(CARD_ANSWER_FIELD_NAME, currentCard.answer);
                methods.setValue(CARD_ANSWER_FIELD_MODE, currentCard.answerMode);
            }
        };

        methods.reset();

        setCardData();
    }, [cardIndex, methods]);

    const submit = useCallback(async () => {
        try {
            await db.cards.put({ id: cardIndex, ...methods.getValues() });

            if (isLastCard) {
                onSaveDeck();
            } else {
                onNextStep();
            }
        } catch {}
    }, [methods, cardIndex, isLastCard, onSaveDeck, onNextStep]);

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
            <ColumnLayout as='form' onSubmit={methods.handleSubmit(submit)}>
                <Box mt={8}>
                    <CardQuestionField />
                    <CardAnswerField />
                </Box>
                <Box display='grid' gap={2}>
                    {isLastCard ? <Button type='submit'>Сохранить</Button> : <Button type='submit'>Далее</Button>}
                    <Button onClick={onPrevStep}>Назад</Button>
                </Box>
            </ColumnLayout>
        </FormProvider>
    );
};

export default CardStep;
