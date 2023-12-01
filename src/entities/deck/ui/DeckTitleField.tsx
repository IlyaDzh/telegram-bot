import React, { useId } from 'react';
import { useFormContext } from 'react-hook-form';

import { Field } from '@/shared/ui/field';
import { Input } from '@chakra-ui/input';

export const DECK_TITLE_FIELD_NAME = 'title';

type DeckTitleFormField = { [DECK_TITLE_FIELD_NAME]: string };

export const DeckTitleField = () => {
    const { register } = useFormContext<DeckTitleFormField>();
    const errorId = useId();

    return (
        <Field errorId={errorId}>
            <Input
                placeholder={'Название колоды'}
                aria-label='deck-title-field'
                aria-errormessage={errorId}
                maxLength={50}
                {...register(DECK_TITLE_FIELD_NAME, {
                    required: true,
                })}
            />
        </Field>
    );
};
