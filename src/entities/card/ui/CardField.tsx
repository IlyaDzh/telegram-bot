import React, { useId } from 'react';
import { useFormContext } from 'react-hook-form';
import { Switch, Textarea } from '@chakra-ui/react';

import { Field } from '@/shared/ui/field';
import { Editor } from '@/shared/ui/editor';
import { ECardFieldMode } from '@/enums';

interface CardFieldProps {
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
        setValue(fieldNameMode, fieldMode === ECardFieldMode.Code ? ECardFieldMode.Text : ECardFieldMode.Code);
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
                zIndex={10}
            />
        </Field>
    );
};
