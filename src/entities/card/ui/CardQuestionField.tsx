import React from 'react';

import { CardField } from './CardField';

export const CARD_QUESTION_FIELD_NAME = 'cardQuestion';
export const CARD_QUESTION_FIELD_MODE = 'cardQuestionMode';

export const CardQuestionField = () => {
    return (
        <CardField fieldName={CARD_QUESTION_FIELD_NAME} fieldNameMode={CARD_QUESTION_FIELD_MODE} placeholder='Вопрос' />
    );
};
