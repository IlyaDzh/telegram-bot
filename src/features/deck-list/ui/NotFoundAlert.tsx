import React from 'react';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Button } from '@chakra-ui/react';
import NextLink from 'next/link';

import { ColumnLayout } from '@/shared/ui/layout';
import { useTelegram } from '@/hooks/TelegramProvider';
import { Role } from '@/types/user';

export const NotFoundAlert = () => {
    const { user } = useTelegram();

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
                    Колод не найдено!
                </AlertTitle>
                <AlertDescription maxWidth='sm'>Создайте колоду, если у вас есть необходимые права</AlertDescription>
            </Alert>

            {user && user.role === Role.admin && (
                <NextLink href='/' passHref legacyBehavior>
                    <Button as='a' width='100%'>
                        Создать колоду
                    </Button>
                </NextLink>
            )}
        </ColumnLayout>
    );
};
