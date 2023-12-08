import { FC } from 'react';
import { Text } from '@chakra-ui/react';

import { LearningDeck } from '../types';
import { getQuestionsCountText } from '@/shared/utils/formatQuestionsCount';
import { DeckCard as BaseDeckCard } from '@/entities/deck';

export const LearningDeckCard: FC<LearningDeck> = ({ deck, knownCards, unknownCards }) => {
    return (
        <BaseDeckCard
            deckId={deck.id}
            title={deck.title}
            category={deck.category}
            questionsCount={knownCards.length + unknownCards.length}
        >
            <Text color='green.600'>Знаю: {getQuestionsCountText(knownCards.length)}</Text>
            <Text color='red.600'>Не знаю: {getQuestionsCountText(unknownCards.length)}</Text>
        </BaseDeckCard>
    );
};
