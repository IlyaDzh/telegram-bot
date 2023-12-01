import React from 'react';

import { CardField } from './CardField';

export const CARD_ANSWER_FIELD_NAME = 'answer';
export const CARD_ANSWER_FIELD_MODE = 'answerMode';

export const CardAnswerField = () => {
    return <CardField fieldName={CARD_ANSWER_FIELD_NAME} fieldNameMode={CARD_ANSWER_FIELD_MODE} placeholder='Ответ' />;
};
