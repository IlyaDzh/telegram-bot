import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import NextLink from 'next/link';

import { ColumnLayout } from '@/shared/ui/layout';
import { Alert } from '@/shared/ui/alert';
import { Confetti } from '@/shared/ui/confetti';

export const SuccessAlert = () => {
    return (
        <ColumnLayout>
            <Confetti />

            <Alert
                status='success'
                title='Вы прошли все вопросы!'
                description='Результаты ваших ответов будут отображаться на странице изучаемых колод'
            />

            <Box display='grid' gap={2}>
                <NextLink href='/learning-decks' passHref legacyBehavior>
                    <Button as='a' width='100%'>
                        Перейти в изучаемые колоды
                    </Button>
                </NextLink>

                <NextLink href='/decks' passHref legacyBehavior>
                    <Button as='a' width='100%'>
                        На страницу колод
                    </Button>
                </NextLink>
            </Box>
        </ColumnLayout>
    );
};
