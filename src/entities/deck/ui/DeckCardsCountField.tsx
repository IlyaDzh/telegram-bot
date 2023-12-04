import React, { useId } from 'react';
import { useFormContext } from 'react-hook-form';
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react';

import { Field } from '@/shared/ui/field';

export const DECK_CARDS_COUNT_FIELD_NAME = 'cardsCount';

type DeckCardsCountFormField = { [DECK_CARDS_COUNT_FIELD_NAME]: number };

export const DeckCardsCountField = () => {
    const { setValue, watch } = useFormContext<DeckCardsCountFormField>();
    const errorId = useId();

    const count = watch(DECK_CARDS_COUNT_FIELD_NAME);

    const handleCountChange = (_: string, value: number) => {
        setValue(DECK_CARDS_COUNT_FIELD_NAME, value);
    };

    return (
        <Field errorId={errorId}>
            <NumberInput
                value={count}
                onChange={handleCountChange}
                aria-label='deck-cards-count-field'
                aria-errormessage={errorId}
                allowMouseWheel
            >
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
        </Field>
    );
};
