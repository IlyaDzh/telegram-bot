import React, { useEffect, useState } from 'react';
import { Spinner } from '@chakra-ui/react';

import DeckStep from './DeckStep';
import CardStep from './CardStep';
import { DeckUtils } from '../lib/DeckUtils';
import { fetchCreateDeck } from '../api/fetchCreateDeck';
import { db } from '@/db';

export const DeckCreator = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getStep = async () => {
            const cards = await db.cards.toArray();
            const deck = await db.deck.toCollection().first();

            return DeckUtils.getCurrentStep(deck, cards);
        };

        getStep().then(step => {
            setCurrentStep(step);
            setIsLoading(false);
        });
    }, []);

    const handleNextStep = () => {
        setCurrentStep(prev => ++prev);
    };

    const handlePrevStep = () => {
        setCurrentStep(prev => --prev);
    };

    const handleCreateDeck = async () => {
        try {
            const cards = await db.cards.toArray();
            const deck = await db.deck.toCollection().first();

            await fetchCreateDeck(DeckUtils.formatCreateDeckPayload(deck, cards));

            db.deck.clear();
            db.cards.clear();
            setCurrentStep(0);
        } catch {}
    };

    const handleCloseDeck = () => {
        db.deck.clear();
        db.cards.clear();
        setCurrentStep(0);
    };

    if (isLoading) {
        return <Spinner thickness='4px' emptyColor='gray.200' size='xl' margin='auto' />;
    }

    return currentStep === 0 ? (
        <DeckStep onSuccess={handleNextStep} />
    ) : (
        <CardStep
            cardIndex={currentStep}
            onNextStep={handleNextStep}
            onPrevStep={handlePrevStep}
            onSaveDeck={handleCreateDeck}
            onClose={handleCloseDeck}
        />
    );
};
