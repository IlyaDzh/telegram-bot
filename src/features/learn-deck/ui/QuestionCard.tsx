import { FC, useEffect, useRef, useState } from 'react';
import { Card, CardHeader, CardFooter, Button, Text, Box } from '@chakra-ui/react';

import { Card as CardProps } from '@/types/card';
import { CardFieldMode } from '@/types/card';
import { Editor } from '@/shared/ui/editor';

interface ContentProps {
    mode: CardFieldMode;
    value: string;
}

const Content: FC<ContentProps> = ({ mode, value }) => {
    if (mode === CardFieldMode.Text) {
        return (
            <Text as='pre' whiteSpace='pre-wrap' color='var(--tg-theme-text-color)'>
                {value}
            </Text>
        );
    }

    return <Editor value={value} maxLines={30} minLines={8} readOnly />;
};

export const QuestionCard: FC<CardProps> = ({ id, question, questionMode, answer, answerMode }) => {
    const [isAnswerVisible, setIsAnswerVisible] = useState<boolean>(false);
    const cardRef = useRef<HTMLDivElement | null>(null);
    const frontRef = useRef<HTMLDivElement | null>(null);
    const backRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setIsAnswerVisible(false);
    }, [id]);

    useEffect(() => {
        if (cardRef.current && backRef.current && frontRef.current) {
            if (isAnswerVisible) {
                cardRef.current.style.height = `${backRef.current.clientHeight}px`;
            } else {
                cardRef.current.style.height = `${frontRef.current.clientHeight}px`;
            }
        }
    }, [isAnswerVisible]);

    const toggleAnswer = () => {
        setIsAnswerVisible(prev => !prev);
    };

    return (
        <Card
            ref={cardRef}
            variant='outline'
            transition='transform 0.6s, height 0.4s'
            style={{
                position: 'relative',
                transformStyle: 'preserve-3d',
                transform: isAnswerVisible ? 'rotateY(180deg)' : 'rotateY(0)',
            }}
        >
            <Box
                ref={frontRef}
                position='absolute'
                transition='transform 0.6s'
                width='100%'
                style={{
                    backfaceVisibility: 'hidden',
                }}
            >
                <CardHeader>
                    <Content mode={questionMode} value={question} />
                </CardHeader>
                <CardFooter p={0}>
                    <Button width='100%' onClick={toggleAnswer}>
                        Показать ответ
                    </Button>
                </CardFooter>
            </Box>
            <Box
                ref={backRef}
                position='absolute'
                transition='transform 0.6s'
                width='100%'
                transform='rotateY(180deg)'
                style={{
                    backfaceVisibility: 'hidden',
                }}
            >
                <CardHeader>
                    <Content mode={answerMode} value={answer} />
                </CardHeader>
                <CardFooter p={0}>
                    <Button width='100%' onClick={toggleAnswer}>
                        Скрыть ответ
                    </Button>
                </CardFooter>
            </Box>
        </Card>
    );
};
