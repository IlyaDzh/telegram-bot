import React, {FC, ReactNode, useId} from 'react';
import {FormControl, FormControlProps, FormErrorMessage, FormHelperText, FormLabel} from "@chakra-ui/react";
import {FieldError} from "react-hook-form";

type Props = {
    label?:string;
    helperText?:string;
    error?: FieldError;
    children: ReactNode;
    errorId: string;
} & FormControlProps

export const Field:FC<Props> = ({label, helperText, error, children,  ...formControlProps }) => {

    return (
        <FormControl mb={{ base: 5, md: 9 }} {...formControlProps} isInvalid={!!error}>
            <FormLabel>{label}</FormLabel>
            {children}
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
            {error && (
                <FormErrorMessage id={errorId}>{error.message}</FormErrorMessage>
            )}
        </FormControl>
    );
};