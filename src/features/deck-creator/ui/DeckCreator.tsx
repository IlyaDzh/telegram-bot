import React, { useEffect, useState } from 'react';
import { Spinner } from '@chakra-ui/react';

import DeckStep from './DeckStep';
import CardStep from './CardStep';
import { indexedDb } from '../lib/indexedDb';
import { DeckUtils } from '../lib/DeckUtils';

export const DeckCreator = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        DeckUtils.getCurrentStep().then(step => {
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
        const data = await indexedDb.getAll();
        console.log('data', data);

        alert('save deck');
    };

    const handleCloseDeck = () => {
        indexedDb.deleteAll();
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
