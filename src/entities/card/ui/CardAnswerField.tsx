import React from 'react';

import { CardField } from './CardField';

export const CARD_ANSWER_FIELD_NAME = 'cardAnswer';
export const CARD_ANSWER_FIELD_MODE = 'cardAnswerMode';

export const CardAnswerField = () => {
    return <CardField fieldName={CARD_ANSWER_FIELD_NAME} fieldNameMode={CARD_ANSWER_FIELD_MODE} placeholder='Ответ' />;
};
