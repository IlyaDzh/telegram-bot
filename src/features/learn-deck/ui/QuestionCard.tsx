import { FC, useEffect, useState } from 'react';
import { Card, CardHeader, CardFooter, Button, Text } from '@chakra-ui/react';

import { Card as CardProps } from '../types';
import { CardFieldMode } from '@/types/card';
import { Editor } from '@/shared/ui/editor';

interface ContentProps {
    mode: CardFieldMode;
    value: string;
}

const Content: FC<ContentProps> = ({ mode, value }) => {
    if (mode === CardFieldMode.Text) {
        return (
            <Text as='pre' whiteSpace='pre-wrap'>
                {value}
            </Text>
        );
    }

    return <Editor value={value} maxLines={30} minLines={8} readOnly />;
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
            <CardHeader>
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
