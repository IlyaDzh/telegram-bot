import React from 'react';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Button } from '@chakra-ui/react';
import NextLink from 'next/link';

import { ColumnLayout } from '@/shared/ui/layout';

export const SuccessAlert = () => {
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
};
