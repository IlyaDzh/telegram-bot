import React, { useId } from 'react';
import { useFormContext } from 'react-hook-form';
import { Switch, Textarea } from '@chakra-ui/react';

import { Field } from '@/shared/ui/field';
import { Editor } from '@/shared/ui/editor';
import { CardFieldMode } from '@/types/card';

interface CardFieldProps {
    fieldName: string;
    fieldNameMode: string;
    placeholder: string;
}

interface FormData {
    [key: string]: string;
}

export const CardField: React.FC<CardFieldProps> = ({ fieldName, fieldNameMode, placeholder }) => {
    const { register, setValue, watch } = useFormContext<FormData>();
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
            {fieldMode === CardFieldMode.Code ? (
                <Editor
                    placeholder={placeholder}
                    aria-label={`card-${fieldName}-field`}
                    aria-errormessage={errorId}
                    value={fieldValue}
                    onChange={handleEditorChange}
                    maxLines={20}
                    minLines={8}
                />
            ) : (
                <Textarea
                    placeholder={placeholder}
                    aria-label={`card-${fieldName}-field`}
                    aria-errormessage={errorId}
                    {...register(fieldName)}
                />
            )}

            <Switch
                isChecked={fieldMode === CardFieldMode.Code}
                onChange={handleSwitchMode}
                size='md'
                position='absolute'
                top={1}
                right={1}
                zIndex={10}
            />
        </Field>
    );
};
