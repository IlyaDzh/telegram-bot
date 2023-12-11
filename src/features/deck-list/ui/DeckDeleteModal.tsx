import React from 'react';
import { Text } from '@chakra-ui/react';
import { Modal } from '@/shared/ui/modal';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
}

export const DeckDeleteModal: React.FC<Props> = props => {
    return (
        <Modal title='Удаление колоды' submitTitle='Подтвердить' {...props}>
            <Text>Вы уверены что хотите удалить эту колоду?</Text>
        </Modal>
    );
};
