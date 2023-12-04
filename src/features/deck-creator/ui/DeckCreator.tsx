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
        const getStepsState = async () => {
            try {
                const step = await DeckCreatorUtils.getCurrentStep();
                setCurrentStep(step);
                setIsLoading(false);
            } catch {}
        };

        getStepsState();
    }, []);

    const handleNextStep = () => setCurrentStep(prev => ++prev);
    const handlePrevStep = () => setCurrentStep(prev => --prev);

    const handleCreateDeck = async () => {
        try {
            await DeckCreatorUtils.createDeck();
            DeckCreatorUtils.clearDB();
            setIsCreated(true);
        } catch {}
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
