import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
    return (
        <Html lang='ru'>
            <Head>
                <Script src='/static/telegram-web-app.js' strategy='beforeInteractive' />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
