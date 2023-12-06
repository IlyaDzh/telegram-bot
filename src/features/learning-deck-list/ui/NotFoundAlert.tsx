import React from 'react';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Button } from '@chakra-ui/react';
import NextLink from 'next/link';

import { ColumnLayout } from '@/shared/ui/layout';

export const NotFoundAlert = () => {
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
                    Изучаемых колод не найдено!
                </AlertTitle>
                <AlertDescription maxWidth='sm'>Начните изучать колоду и тогда она появится здесь</AlertDescription>
            </Alert>

            <NextLink href='/decks' passHref legacyBehavior>
                <Button as='a'>На страницу колод</Button>
            </NextLink>
        </ColumnLayout>
    );
};
