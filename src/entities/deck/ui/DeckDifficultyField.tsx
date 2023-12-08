import React, { useId } from 'react';
import { useFormContext } from 'react-hook-form';
import { Select } from '@chakra-ui/react';

import { Field } from '@/shared/ui/field';
import { Difficulty } from '@/types/deck';

export const DECK_DIFFICULTY_FIELD_NAME = 'difficulty';

type DeckDifficultyFormField = { [DECK_DIFFICULTY_FIELD_NAME]: string };

export const DeckDifficultyField = () => {
    const { register } = useFormContext<DeckDifficultyFormField>();
    const errorId = useId();

    return (
        <Field errorId={errorId}>
            <Select
                aria-label='deck-difficulty-field'
                aria-errormessage={errorId}
                {...register(DECK_DIFFICULTY_FIELD_NAME, {
                    required: true,
                })}
            >
                <option value={Difficulty.ease}>Легкий</option>
                <option value={Difficulty.medium}>Средний</option>
                <option value={Difficulty.hard}>Сложный</option>
            </Select>
        </Field>
    );
};
