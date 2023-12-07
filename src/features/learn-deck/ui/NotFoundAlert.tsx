import React from 'react';
import { Button } from '@chakra-ui/react';
import NextLink from 'next/link';

import { ColumnLayout } from '@/shared/ui/layout';
import { Alert } from '@/shared/ui/alert';

export const NotFoundAlert = () => {
    return (
        <ColumnLayout>
            <Alert
                status='error'
                title='Колода не найдена!'
                description='Попробуйте обновить страницу или перейти в другую колоду'
            />

            <NextLink href='/decks' passHref legacyBehavior>
                <Button as='a' width='100%'>
                    На страницу колод
                </Button>
            </NextLink>
        </ColumnLayout>
    );
};
