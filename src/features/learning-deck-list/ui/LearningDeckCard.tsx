import { FC } from 'react';
import NextLink from 'next/link';
import { Card, CardHeader, Heading, CardFooter, Button, Text, Box, CardBody } from '@chakra-ui/react';

import { LearningDeck } from '../types';
import { getQuestionsCountText } from '@/shared/utils/formatQuestionsCount';

export const LearningDeckCard: FC<LearningDeck> = ({ deck, knownCards, unknownCards }) => {
    return (
        <Card variant='outline'>
            <CardHeader>
                <Box display='flex' alignItems='center' justifyContent='space-between' gap={4} mb={1}>
                    <Heading size='sm' as='h2' color='var(--tg-theme-hint-color)' fontWeight='400'>
                        {deck.category}
                    </Heading>
                </Box>
                <Heading size='md' as='h1' color='var(--tg-theme-text-color)'>
                    {deck.title}
                </Heading>
            </CardHeader>
            <CardBody pt={0}>
                <Text color='green.600'>Знаю: {getQuestionsCountText(knownCards.length)}</Text>
                <Text color='red.600'>Не знаю: {getQuestionsCountText(unknownCards.length)}</Text>
            </CardBody>
            <CardFooter p={0}>
                <NextLink href={`/decks/${deck.id}`} passHref legacyBehavior>
                    <Button as='a' width='100%'>
                        Изучать
                    </Button>
                </NextLink>
            </CardFooter>
        </Card>
    );
};
