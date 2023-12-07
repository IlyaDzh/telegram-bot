import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button } from '@chakra-ui/react';

import { ColumnLayout } from '@/shared/ui/layout';
import { Spinner } from '@/shared/ui/spinner';
import { Card } from '@/types/card';
import { fetchCreateLearningDeck } from '../api/fetchCreateLearningDeck';
import { fetchCards } from '../api/fetchCards';
import { QuestionCard } from './QuestionCard';
import { SuccessAlert } from './SuccessAlert';
import { NotFoundAlert } from './NotFoundAlert';

export const LearnDeck = () => {
    const router = useRouter();

    const [cards, setCards] = useState<Card[]>([]);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);

    const [knownCardIds, setKnownCardIds] = useState<string[]>([]);
    const [unknownCardIds, setUnknownCardIds] = useState<string[]>([]);

    useEffect(() => {
        if (router.query.id) {
            fetchCards(router.query.id.toString()).then(cards => {
                setCards(cards);
                setIsLoading(false);
            });
        }
    }, [router]);

    useEffect(() => {
        if (!isLoading && currentStep >= cards.length && router.query.id) {
            fetchCreateLearningDeck({
                deckId: router.query.id.toString(),
                knownIds: knownCardIds,
                unknownIds: unknownCardIds,
            });
        }
    }, [cards, currentStep, router, knownCardIds, unknownCardIds, isLoading]);

    const handleKnownClick = () => {
        setCurrentStep(prev => ++prev);
        setKnownCardIds(prev => [...prev, cards[currentStep].id]);
    };

    const handleUnknownClick = () => {
        setCurrentStep(prev => ++prev);
        setUnknownCardIds(prev => [...prev, cards[currentStep].id]);
    };

    if (isLoading) {
        return <Spinner />;
    }

    if (cards.length === 0) {
        return <NotFoundAlert />;
    }

    if (currentStep >= cards.length) {
        return <SuccessAlert />;
    }

    return (
        <ColumnLayout>
            <QuestionCard {...cards[currentStep]} />

            <Box display='grid' gap={2}>
                <Button onClick={handleKnownClick}>Знаю</Button>
                <Button onClick={handleUnknownClick}>Не знаю</Button>
            </Box>
        </ColumnLayout>
    );
};
