import React from 'react';

import { CardField } from './CardField';

export const CARD_QUESTION_FIELD_NAME = 'question';
export const CARD_QUESTION_FIELD_MODE = 'questionMode';

export const CardQuestionField = () => {
    return (
        <CardField fieldName={CARD_QUESTION_FIELD_NAME} fieldNameMode={CARD_QUESTION_FIELD_MODE} placeholder='Вопрос' />
    );
};
