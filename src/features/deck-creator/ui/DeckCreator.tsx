import React, { useEffect, useState } from 'react';

import { Spinner } from '@/shared/ui/spinner';
import { DeckCreatorUtils } from '../lib/DeckCreatorUtils';
import DeckStep from './DeckStep';
import CardStep from './CardStep';
import { SuccessAlert } from './SuccessAlert';

export const DeckCreator = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreated, setIsCreated] = useState(false);

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
            setIsCreated(true);
        });
    };

    const handleCloseDeck = () => {
        DeckCreatorUtils.clearDB();
        setCurrentStep(0);
    };

    const handleCreateAgainClick = () => {
        setCurrentStep(0);
        setIsCreated(false);
    };

    if (isLoading) {
        return <Spinner />;
    }

    if (isCreated) {
        return <SuccessAlert onCreate={handleCreateAgainClick} />;
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
