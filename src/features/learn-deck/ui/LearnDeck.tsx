import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Spinner } from '@chakra-ui/react';

import { QuestionCard } from './QuestionCard';
import { Card } from '../types';
import { fetchCards } from '../api/fetchCards';
import { ColumnLayout } from '@/shared/ui/layout';

export const LearnDeck = () => {
    const router = useRouter();

    const [cards, setCards] = useState<Card[]>([]);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (router.query.id) {
            fetchCards(router.query.id.toString()).then(cards => {
                setCards(cards);
                setIsLoading(false);
            });
        }
    }, [router]);

    const handleKnownClick = () => {
        setCurrentStep(prev => ++prev);
    };

    const handleUnknownClick = () => {
        setCurrentStep(prev => ++prev);
    };

    if (isLoading) {
        return <Spinner thickness='4px' emptyColor='gray.200' size='xl' margin='auto' />;
    }

    if (cards.length === 0) {
        return (
            <ColumnLayout>
                <Alert
                    variant='top-accent'
                    status='error'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    textAlign='center'
                    minHeight='200px'
                >
                    <AlertIcon boxSize='40px' mr={0} />
                    <AlertTitle mt={4} mb={1} fontSize='lg'>
                        Колода не найдена!
                    </AlertTitle>
                    <AlertDescription maxWidth='sm'>
                        Попробуйте обновить страницу или перейти в другую колоду
                    </AlertDescription>
                </Alert>

                <NextLink href='/decks' passHref legacyBehavior>
                    <Button as='a' width='100%'>
                        На страницу колод
                    </Button>
                </NextLink>
            </ColumnLayout>
        );
    }

    if (currentStep >= cards.length) {
        return (
            <ColumnLayout>
                <Alert
                    variant='top-accent'
                    status='success'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    textAlign='center'
                    minHeight='200px'
                >
                    <AlertIcon boxSize='40px' mr={0} />
                    <AlertTitle mt={4} mb={1} fontSize='lg'>
                        Вы прошли все вопросы!
                    </AlertTitle>
                    <AlertDescription maxWidth='sm'>
                        Результаты ваших ответов будут отображаться на странице изучаемых колод
                    </AlertDescription>
                </Alert>

                <NextLink href='/decks' passHref legacyBehavior>
                    <Button as='a' width='100%'>
                        На страницу колод
                    </Button>
                </NextLink>
            </ColumnLayout>
        );
    }

    return (
        <ColumnLayout>
            <QuestionCard {...cards[currentStep]} />

            <Box display='grid' gap={2}>
                <Button onClick={handleKnownClick}>Знаю</Button>
                <Button onClick={handleUnknownClick}>Не знаю</Button>
            </Box>
        </ColumnLayout>
    );
};
