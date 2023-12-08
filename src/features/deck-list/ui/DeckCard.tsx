import { FC } from 'react';

import { Deck } from '../types';
import { DeckCard as BaseDeckCard } from '@/entities/deck';

export const DeckCard: FC<Deck> = ({ id, title, category, difficulty, questionsCount, isNew }) => {
    return (
        <BaseDeckCard
            deckId={id}
            title={title}
            category={category}
            difficulty={difficulty}
            questionsCount={questionsCount}
            isNew={isNew}
        />
    );
};
