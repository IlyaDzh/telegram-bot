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
                title='Изучаемых колод не найдено!'
                description='Начните изучать колоду и тогда она появится здесь'
            />

            <NextLink href='/decks' passHref legacyBehavior>
                <Button as='a'>На страницу колод</Button>
            </NextLink>
        </ColumnLayout>
    );
};
