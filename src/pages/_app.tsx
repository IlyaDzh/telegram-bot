import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import { TelegramProvider, useTelegram } from '@/hooks/useTelegram';
import { theme } from '@/application/theme';
import { Alert } from '@/shared/ui/alert';

function App({ Component, pageProps }: AppProps) {
    const { isLoading, isError } = useTelegram();

    if (isLoading) return;

    if (isError)
        return (
            <Alert
                title='Функционал доступен только в Telegram'
                description='Пожалуйста, перейдите в бота, чтобы продолжить'
            />
        );

    return <Component {...pageProps} />;
}

export default function AppWrapper(props: AppProps) {
    return (
        <TelegramProvider>
            <ChakraProvider theme={theme}>
                <App {...props} />
            </ChakraProvider>
        </TelegramProvider>
    );
}
