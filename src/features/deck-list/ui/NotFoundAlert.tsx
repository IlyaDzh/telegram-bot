import React from 'react';
import { Button } from '@chakra-ui/react';
import NextLink from 'next/link';

import { ColumnLayout } from '@/shared/ui/layout';
import { Alert } from '@/shared/ui/alert';
import { useTelegram } from '@/hooks/useTelegram';
import { Role } from '@/types/user';

export const NotFoundAlert = () => {
    const { user } = useTelegram();

    return (
        <ColumnLayout>
            <Alert
                status='error'
                title='Колод не найдено!'
                description='Создайте колоду, если у вас есть необходимые права'
            />

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
