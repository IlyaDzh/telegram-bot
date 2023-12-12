import React from 'react';
import { Box, Input, RadioGroup, Stack, Radio, Switch, FormLabel, FormControl } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { Difficulty } from '@/types/deck';

export const DECK_FILTER_SEARCH_FIELD_NAME = 'search';
export const DECK_FILTER_DIFFICULTY_FIELD_NAME = 'difficulty';
export const DECK_FILTER_NEW_FIELD_NAME = 'onlyNew';

export const DeckFilters = () => {
    const { register, control } = useFormContext();

    return (
        <Box display='grid' gap={2}>
            <Input placeholder='Поиск' {...register(DECK_FILTER_SEARCH_FIELD_NAME)} />

            <Controller
                name={DECK_FILTER_DIFFICULTY_FIELD_NAME}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <RadioGroup onChange={onChange} value={value}>
                        <Stack direction='row'>
                            <Radio value={Difficulty.All}>Все</Radio>
                            <Radio value={Difficulty.Ease}>Легко</Radio>
                            <Radio value={Difficulty.Medium}>Средне</Radio>
                            <Radio value={Difficulty.Hard}>Сложно</Radio>
                        </Stack>
                    </RadioGroup>
                )}
            />

            <FormControl display='flex' alignItems='center' gap={2}>
                <Switch id='onlyNew' size='md' {...register(DECK_FILTER_NEW_FIELD_NAME)} />
                <FormLabel htmlFor='onlyNew' mb={0} fontWeight="regular">Только новые</FormLabel>
            </FormControl>
        </Box>
    );
};
