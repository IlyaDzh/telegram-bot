import React from 'react';
import { Alert } from '@/shared/ui/alert';

export const NotFoundAlert = () => {
    return (
        <Alert
            status='error'
            title='Изучаемых колод не найдено!'
            description='Начните изучать колоду и тогда она появится здесь'
        />
    );
};
