import { FC } from 'react';
import NextLink from 'next/link';
import {
    Card,
    CardHeader,
    Heading,
    CardFooter,
    Button,
    Text,
    Box,
    CardBody,
    Badge,
    CloseButton,
} from '@chakra-ui/react';

import { getQuestionsCountText } from '@/shared/utils/formatQuestionsCount';
import { Difficulty } from '@/types/deck';

interface Props extends React.PropsWithChildren {
    deckId: string;
    title: string;
    category: string;
    difficulty: Difficulty;
    questionsCount: number;
    isNew?: boolean;
    onDelete?: () => void;
}

const DIFFICULTY_COLORS = {
    [Difficulty.Ease]: 'green',
    [Difficulty.Medium]: 'yellow',
    [Difficulty.Hard]: 'red',
};

export const DeckCard: FC<Props> = ({
    deckId,
    title,
    category,
    difficulty,
    questionsCount,
    isNew,
    onDelete,
    children,
}) => {
    return (
        <Card variant='outline'>
            <CardHeader>
                <Box display='flex' justifyContent='space-between' alignItems='center' gap={4} mb={1}>
                    <Box display='flex' gap={1}>
                        <Badge colorScheme={DIFFICULTY_COLORS[difficulty as keyof typeof DIFFICULTY_COLORS]}>
                            {difficulty}
                        </Badge>
                        {isNew && <Badge colorScheme='green'>NEW</Badge>}
                    </Box>

                    {onDelete && <CloseButton color='red.600' onClick={onDelete} />}
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
