import { FC } from 'react';
import NextLink from 'next/link';
import { Card, CardHeader, Heading, CardFooter, Button, Text, Box, Badge } from '@chakra-ui/react';

import { Deck } from '../types';
import { getQuestionsCountText } from '@/shared/utils/formatQuestionsCount';

export const DeckCard: FC<Deck> = ({ id, title, category, questionsCount, isNew }) => {
    return (
        <Card variant='outline'>
            <CardHeader>
                <Box display='flex' alignItems='center' justifyContent='space-between' gap={4} mb={1}>
                    <Heading size='sm' as='h2' color='gray.600' fontWeight='400'>
                        {category} {isNew && <Badge colorScheme='green'>NEW</Badge>}
                    </Heading>
                    <Text color='gray.600'>{getQuestionsCountText(questionsCount)}</Text>
                </Box>
                <Heading size='md' as='h1'>
                    {title}
                </Heading>
            </CardHeader>
            <CardFooter p={0}>
                <NextLink href={`/decks/${id}`} passHref legacyBehavior>
                    <Button as='a' width='100%'>
                        Изучать
                    </Button>
                </NextLink>
            </CardFooter>
        </Card>
    );
};
