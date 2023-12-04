import { FC } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

export const ColumnLayout: FC<BoxProps> = ({ children, ...props }) => {
    return (
        <Box h='100%' display='flex' flexDirection='column' justifyContent='space-between' gap={8} {...props}>
            {children}
        </Box>
    );
};
