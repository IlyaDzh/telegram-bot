import { FC } from 'react';

import { Deck } from '../types';
import { DeckCard as BaseDeckCard } from '@/entities/deck';

export const DeckCard: FC<Deck> = ({ id, title, category, questionsCount, isNew }) => {
    return <BaseDeckCard deckId={id} title={title} category={category} questionsCount={questionsCount} isNew={isNew} />;
};
