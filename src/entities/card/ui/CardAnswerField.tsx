import React, { useId } from 'react';
import { useFormContext } from 'react-hook-form';

import { Field } from '@/shared/ui/field';
import { Textarea } from '@chakra-ui/react';

export const CARD_ANSWER_FIELD_NAME = 'cardAnswer';

export type CardAnswerFormField = { [CARD_ANSWER_FIELD_NAME]: string };

export const CardAnswerField = () => {
    const { register } = useFormContext<CardAnswerFormField>();
    const errorId = useId();

    return (
        <Field errorId={errorId}>
            <Textarea
                placeholder='Ответ'
                aria-label='card-answer-field'
                aria-errormessage={errorId}
                {...register(CARD_ANSWER_FIELD_NAME, {
                    required: true,
                })}
            />
        </Field>
    );
};
