import React, { useId } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@chakra-ui/input';

import { Field } from '@/shared/ui/field';

export const DECK_CATEGORY_FIELD_NAME = 'category';

type DeckCategoryFormField = { [DECK_CATEGORY_FIELD_NAME]: string };

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
