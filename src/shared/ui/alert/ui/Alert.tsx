import React, { FC } from 'react';
import { Alert as BaseAlert, AlertDescription, AlertIcon, AlertTitle, AlertProps } from '@chakra-ui/react';

interface Props extends AlertProps {
    title: string;
    description: string;
}

export const Alert: FC<Props> = ({ title, description, ...props }) => {
    return (
        <BaseAlert
            variant='top-accent'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            minHeight='200px'
            {...props}
        >
            <AlertIcon boxSize='40px' mr={0} />
            <AlertTitle mt={4} mb={1} fontSize='lg' color="gray.900">
                {title}
            </AlertTitle>
            <AlertDescription maxWidth='sm' color="gray.700">{description}</AlertDescription>
        </BaseAlert>
    );
};
