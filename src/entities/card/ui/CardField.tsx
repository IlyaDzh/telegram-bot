import React, { useId } from 'react';
import { useFormContext } from 'react-hook-form';
import { Switch, Textarea } from '@chakra-ui/react';

import { Editor } from './Editor';
import { Field } from '@/shared/ui/field';
import { CardFieldMode } from '@/features/deck-creator/types';

export interface CardFieldProps {
    fieldName: string;
    fieldNameMode: string;
    placeholder: string;
}

export const CardField: React.FC<CardFieldProps> = ({ fieldName, fieldNameMode, placeholder }) => {
    const { register, setValue, watch } = useFormContext<any>();
    const errorId = useId();

    const [fieldValue, fieldMode] = watch([fieldName, fieldNameMode]);

    const handleEditorChange = (value: string) => {
        setValue(fieldName, value);
    };

    const handleSwitchMode = () => {
        setValue(fieldNameMode, fieldMode === CardFieldMode.Code ? CardFieldMode.Text : CardFieldMode.Code);
    };

    return (
        <Field errorId={errorId} position='relative'>
            {fieldMode === 'code' ? (
                <Editor
                    placeholder={placeholder}
                    aria-label={`card-${fieldName}-field`}
                    aria-errormessage={errorId}
                    value={fieldValue}
                    onChange={handleEditorChange}
                />
            ) : (
                <Textarea
                    placeholder={placeholder}
                    aria-label={`card-${fieldName}-field`}
                    aria-errormessage={errorId}
                    {...register(fieldName, {
                        required: true,
                    })}
                />
            )}

            <Switch
                isChecked={fieldMode === 'code'}
                onChange={handleSwitchMode}
                size='md'
                position='absolute'
                top={1}
                right={1}
                zIndex={5}
            />
        </Field>
    );
};