import React, { useEffect, useState } from 'react';
import { Spinner } from '@chakra-ui/react';

import DeckStep from './DeckStep';
import CardStep from './CardStep';
import { DeckCreatorUtils } from '../lib/DeckCreatorUtils';

export const DeckCreator = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        DeckCreatorUtils.getCurrentStep().then(step => {
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
        DeckCreatorUtils.createDeck().then(() => {
            DeckCreatorUtils.clearDB();
            setCurrentStep(0);
        });
    };

    const handleCloseDeck = () => {
        DeckCreatorUtils.clearDB();
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
