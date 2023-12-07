import React from 'react';
import { Spinner as BaseSpinner, SpinnerProps } from '@chakra-ui/react';

export const Spinner: React.FC<SpinnerProps> = props => {
    return <BaseSpinner thickness='4px' emptyColor='gray.200' size='xl' margin='auto' {...props} />;
};
