import { FC, ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

export const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Box p={5} display='flex' flexDirection='column' h='var(--tg-viewport-height)'>
            {children}
        </Box>
    );
};
