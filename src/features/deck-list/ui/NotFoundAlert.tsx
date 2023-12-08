import React from 'react';

import { Alert } from '@/shared/ui/alert';

export const NotFoundAlert = () => {
    return (
        <Alert
            status='error'
            title='Колод не найдено!'
            description='Создайте колоду, если у вас есть необходимые права'
        />
    );
};
