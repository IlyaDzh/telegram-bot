import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import { TelegramProvider, useTelegram } from '@/hooks/TelegramProvider';
import { theme } from '@/application/theme';

function App({ Component, pageProps }: AppProps) {
    const { isLoading } = useTelegram();

    return !isLoading && <Component {...pageProps} />;
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
