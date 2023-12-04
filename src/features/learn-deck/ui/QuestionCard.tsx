import { FC, useEffect, useState } from 'react';
import { Card, CardHeader, Heading, CardFooter, Button, Text, Box } from '@chakra-ui/react';

import { Card as CardProps } from '../types';
import { Editor } from '@/shared/ui/editor';
import { ECardFieldMode } from '@/enums';

interface ContentProps {
    mode: ECardFieldMode;
    value: string;
}

const Content: FC<ContentProps> = ({ mode, value }) => {
    if (mode === ECardFieldMode.Text) {
        return <Text as='pre'>{value}</Text>;
    }

    return <Editor value={value} maxLines={Infinity} readOnly />;
};

export const QuestionCard: FC<CardProps> = ({ id, question, questionMode, answer, answerMode }) => {
    const [isAnswerVisible, setIsAnswerVisible] = useState<boolean>(false);

    useEffect(() => {
        setIsAnswerVisible(false);
    }, [id]);

    const toggleAnswer = () => {
        setIsAnswerVisible(prev => !prev);
    };

    return (
        <Card variant='outline'>
            <CardHeader maxHeight={400} overflow='auto'>
                {isAnswerVisible ? (
                    <Content mode={answerMode} value={answer} />
                ) : (
                    <Content mode={questionMode} value={question} />
                )}
            </CardHeader>
            <CardFooter p={0}>
                {isAnswerVisible ? (
                    <Button width='100%' onClick={toggleAnswer}>
                        Скрыть ответ
                    </Button>
                ) : (
                    <Button width='100%' onClick={toggleAnswer}>
                        Показать ответ
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};
