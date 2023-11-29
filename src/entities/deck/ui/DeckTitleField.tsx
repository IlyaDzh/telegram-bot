import React, {useId} from 'react';
import {Field} from "@/shared/ui/field";
import {Input} from "@chakra-ui/input";
import {useFormContext} from "react-hook-form";

export const DECK_TITLE_FIELD_NAME = 'deckTitle';

export type DeckTitleFormField = { [DECK_TITLE_FIELD_NAME]: string };

export const DeckTitleField = () => {

    const {
        register,
        formState: { errors },
    } = useFormContext<DeckTitleFormField>();
    const errorId = useId();
    return (
        <Field errorId={errorId}>
            <Input
                placeholder={'Название колоды'}
                aria-label="deck-title-field"
                aria-errormessage={errorId}
                maxLength={50}
                {...register(DECK_TITLE_FIELD_NAME, {
                    validate: (value) => true,
                })}
            />
        </Field>
    );
};