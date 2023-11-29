import React, { useState } from 'react';
import DeckStep from './DeckStep';
import CardStep from './CardStep';
import { indexedDb } from '../lib/indexedDb';

export const DeckCreator = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const handleNextStep = () => {
        setCurrentStep(prev => ++prev);
    };

    const handlePrevStep = () => {
        setCurrentStep(prev => --prev);
    };

    const handleCreateDeck = async () => {
        console.log('indexedDb data', await indexedDb.getAll());

        alert('save deck');
    };

    const handleCloseDeck = () => {
        indexedDb.deleteAll();
        setCurrentStep(0);
    };

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
