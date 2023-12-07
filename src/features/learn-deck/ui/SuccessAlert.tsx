import React from 'react';
import { Button } from '@chakra-ui/react';
import NextLink from 'next/link';

import { ColumnLayout } from '@/shared/ui/layout';
import { Alert } from '@/shared/ui/alert';

export const SuccessAlert = () => {
    return (
        <ColumnLayout>
            <Alert
                status='success'
                title='Вы прошли все вопросы!'
                description='Результаты ваших ответов будут отображаться на странице изучаемых колод'
            />

            <NextLink href='/decks' passHref legacyBehavior>
                <Button as='a' width='100%'>
                    На страницу колод
                </Button>
            </NextLink>
        </ColumnLayout>
    );
};
