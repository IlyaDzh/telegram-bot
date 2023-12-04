import React, { FC } from 'react';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button } from '@chakra-ui/react';
import NextLink from 'next/link';

import { ColumnLayout } from '@/shared/ui/layout';

interface Props {
    onCreate: () => void;
}

export const SuccessAlert: FC<Props> = ({ onCreate }) => {
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
                    Колода создана!
                </AlertTitle>
                <AlertDescription maxWidth='sm'>Теперь она доступна на странице просмотра всех колод</AlertDescription>
            </Alert>

            <Box display='grid' gap={2}>
                <Button onClick={onCreate}>Создать ещё колоду</Button>

                <NextLink href='/decks' passHref legacyBehavior>
                    <Button as='a'>На страницу колод</Button>
                </NextLink>
            </Box>
        </ColumnLayout>
    );
};
