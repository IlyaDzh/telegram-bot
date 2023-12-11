import { FC } from 'react';

import { Deck } from '../types';
import { DeckCard as BaseDeckCard } from '@/entities/deck';

interface Props extends Deck {
    onDelete?: () => void;
}

export const DeckCard: FC<Props> = ({ id, title, category, difficulty, questionsCount, isNew, onDelete }) => {
    return (
        <BaseDeckCard
            deckId={id}
            title={title}
            category={category}
            difficulty={difficulty}
            questionsCount={questionsCount}
            isNew={isNew}
            onDelete={onDelete}
        />
    );
};
