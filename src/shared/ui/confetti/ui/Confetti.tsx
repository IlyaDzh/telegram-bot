import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import BaseConfetti from 'react-dom-confetti';

import { config } from '../config';

export const Confetti = () => {
    const [confetti, setConfetti] = useState(false);

    useEffect(() => {
        setConfetti(true);
    }, []);

    return (
        <Box position='absolute' top='50px' left='50%' transform='translateX(-50%)' zIndex={100}>
            <BaseConfetti active={confetti} config={config} />
        </Box>
    );
};
