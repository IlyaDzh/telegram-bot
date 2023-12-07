import React, { FC } from 'react';
import { Box, Button } from '@chakra-ui/react';
import NextLink from 'next/link';

import { ColumnLayout } from '@/shared/ui/layout';
import { Alert } from '@/shared/ui/alert';

interface Props {
    onCreate: () => void;
}

export const SuccessAlert: FC<Props> = ({ onCreate }) => {
    return (
        <ColumnLayout>
            <Alert
                status='success'
                title='Колода создана!'
                description='Теперь она доступна на странице просмотра всех колод'
            />

            <Box display='grid' gap={2}>
                <Button onClick={onCreate}>Создать ещё колоду</Button>

                <NextLink href='/decks' passHref legacyBehavior>
                    <Button as='a'>На страницу колод</Button>
                </NextLink>
            </Box>
        </ColumnLayout>
    );
};
