import React, { useId } from 'react';
import { useFormContext } from 'react-hook-form';

import { Field } from '@/shared/ui/field';
import { Textarea } from '@chakra-ui/react';

export const CARD_QUESTION_FIELD_NAME = 'cardQuestion';

export type CardQuestionFormField = { [CARD_QUESTION_FIELD_NAME]: string };

export const CardQuestionField = () => {
    const { register } = useFormContext<CardQuestionFormField>();
    const errorId = useId();

    return (
        <Field errorId={errorId}>
            <Textarea
                placeholder='Вопрос'
                aria-label='card-question-field'
                aria-errormessage={errorId}
                {...register(CARD_QUESTION_FIELD_NAME, {
                    required: true,
                })}
            />
        </Field>
    );
};
