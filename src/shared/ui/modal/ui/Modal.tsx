import React, { FC } from 'react';
import {
    Modal as BaseModal,
    Button,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    ModalProps,
} from '@chakra-ui/react';

interface Props extends React.PropsWithChildren<ModalProps> {
    title: string;
    submitTitle?: string;
    onSubmit?: () => void;
}

export const Modal: FC<Props> = ({ title, submitTitle, onSubmit, onClose, isOpen, children, ...props }) => {
    return (
        <BaseModal onClose={onClose} isOpen={isOpen} {...props} size="sm">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{children}</ModalBody>
                <ModalFooter gap={1}>
                    <Button size='md' onClick={onClose}>
                        Закрыть
                    </Button>
                    {onSubmit && (
                        <Button size='md' onClick={onSubmit}>
                            {submitTitle}
                        </Button>
                    )}
                </ModalFooter>
            </ModalContent>
        </BaseModal>
    );
};
