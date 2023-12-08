import { FC } from 'react';
import NextLink from 'next/link';
import { Card, CardHeader, Heading, CardFooter, Button, Text, Box, CardBody, Badge } from '@chakra-ui/react';

import { getQuestionsCountText } from '@/shared/utils/formatQuestionsCount';
import { Difficulty } from '@/types/deck';

interface Props extends React.PropsWithChildren {
    deckId: string;
    title: string;
    category: string;
    difficulty: Difficulty;
    questionsCount: number;
    isNew?: boolean;
}

const DIFFICULTY = {
    [Difficulty.ease]: {
        text: 'Ease',
        color: 'green',
    },
    [Difficulty.medium]: {
        text: 'Medium',
        color: 'yellow',
    },
    [Difficulty.hard]: {
        text: 'Hard',
        color: 'red',
    },
};

export const DeckCard: FC<Props> = ({ deckId, title, category, difficulty, questionsCount, isNew, children }) => {
    return (
        <Card variant='outline'>
            <CardHeader>
                <Box display='flex' gap={1} mb={1}>
                    <Badge colorScheme={DIFFICULTY[difficulty].color}>{DIFFICULTY[difficulty].text}</Badge>
                    {isNew && <Badge colorScheme='green'>NEW</Badge>}
                </Box>
                <Box display='flex' alignItems='center' justifyContent='space-between' gap={4} mb={1}>
                    <Heading size='sm' as='h2' color='var(--tg-theme-hint-color)' fontWeight='400'>
                        {category}
                    </Heading>
                    <Text color='var(--tg-theme-text-color)'>{getQuestionsCountText(questionsCount)}</Text>
                </Box>
                <Heading size='md' as='h1' color='var(--tg-theme-text-color)'>
                    {title}
                </Heading>
            </CardHeader>

            {children && <CardBody pt={0}>{children}</CardBody>}

            <CardFooter p={0}>
                <NextLink href={`/decks/${deckId}`} passHref legacyBehavior>
                    <Button as='a' width='100%'>
                        Изучать
                    </Button>
                </NextLink>
            </CardFooter>
        </Card>
    );
};
