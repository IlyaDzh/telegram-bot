import React, { FC, useCallback, useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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
import { CardFieldMode } from '@/types/card';

type Props = {
    cardIndex: number;
    onNextStep: () => void;
    onPrevStep: () => void;
    onSaveDeck: () => void;
    onClose: () => void;
};

const schema = yup
    .object({
        [CARD_QUESTION_FIELD_NAME]: yup.string().required(),
        [CARD_ANSWER_FIELD_NAME]: yup.string().required(),
        [CARD_QUESTION_FIELD_MODE]: yup.string().required(),
        [CARD_ANSWER_FIELD_MODE]: yup.string().required(),
    })
    .required();

const CardStep: FC<Props> = ({ cardIndex, onNextStep, onPrevStep, onSaveDeck, onClose }) => {
    const [maxCardsCount, setMaxCount] = useState(0);

    const methods = useForm<CreateCardData>({
        mode: 'onBlur',
        defaultValues: {
            questionMode: CardFieldMode.Text,
            answerMode: CardFieldMode.Text,
        },
        resolver: yupResolver(schema),
    });

    const isLastCard = cardIndex === maxCardsCount;

    useEffect(() => {
        const fetchCardData = async () => {
            try {
                const currentCard = await db.cards.where({ id: cardIndex }).first();
                const deckData = await db.deck.toCollection().first();

                if (currentCard) {
                    methods.setValue(CARD_QUESTION_FIELD_NAME, currentCard.question);
                    methods.setValue(CARD_QUESTION_FIELD_MODE, currentCard.questionMode);
                    methods.setValue(CARD_ANSWER_FIELD_NAME, currentCard.answer);
                    methods.setValue(CARD_ANSWER_FIELD_MODE, currentCard.answerMode);
                }

                if (deckData) {
                    setMaxCount(deckData.cardsCount);
                }
            } catch {}
        };

        methods.reset();

        fetchCardData();
    }, [cardIndex, methods]);

    const submit: SubmitHandler<CreateCardData> = useCallback(
        async values => {
            try {
                await db.cards.put({ id: cardIndex, ...values });

                if (isLastCard) {
                    onSaveDeck();
                } else {
                    onNextStep();
                }
            } catch {}
        },
        [cardIndex, isLastCard, onSaveDeck, onNextStep],
    );

    return (
        <FormProvider {...methods}>
            <Box display='flex' justifyContent='space-between' alignItems='center' mb={8}>
                <Heading as='h1' size='md'>
                    Карта {cardIndex}
                </Heading>
                <Text size='sm'>
                    {cardIndex}/{maxCardsCount}
                </Text>
                <Button size='md' onClick={onClose}>
                    Отменить
                </Button>
            </Box>
            <ColumnLayout as='form' onSubmit={methods.handleSubmit(submit)}>
                <Box>
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
