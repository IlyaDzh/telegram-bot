import React, { useId } from 'react';
import { Field } from '@/shared/ui/field';
import { Input } from '@chakra-ui/input';
import { useFormContext } from 'react-hook-form';

export const DECK_CATEGORY_FIELD_NAME = 'deckCategory';

export type DeckCategoryFormField = { [DECK_CATEGORY_FIELD_NAME]: string };

export const DeckCategoryField = () => {
    const { register } = useFormContext<DeckCategoryFormField>();
    const errorId = useId();

    return (
        <Field errorId={errorId}>
            <Input
                placeholder='Категория'
                aria-label='deck-category-field'
                aria-errormessage={errorId}
                maxLength={50}
                {...register(DECK_CATEGORY_FIELD_NAME, {
                    required: true,
                })}
            />
        </Field>
    );
};
