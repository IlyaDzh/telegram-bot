import React, {FC} from 'react';
import {Box, Button, Heading} from "@chakra-ui/react";
import {DeckTitleField} from "@/entities/deck";
import {FormProvider, useForm} from "react-hook-form";

type Props = {
    onSuccess: ()=>void;
}

const DeckStep:FC<Props> = ({onSuccess}) => {
    const {handleSubmit, ...form} = useForm({mode: 'onSubmit'});

    const submit = ()=>{
        onSuccess()
    }

    return (
        <FormProvider {...form} handleSubmit={handleSubmit}>
            <Heading>Колода</Heading>
            <Box as="form" onSubmit={handleSubmit(submit)} h="100%" display="flex" flexDirection="column">
                <Box mt={8}>
                    <DeckTitleField/>
                </Box>
                <Button type="submit" mt="auto">Далее</Button>
            </Box>
        </FormProvider>
    );
};

export default DeckStep;