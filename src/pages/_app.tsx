import {ChakraProvider} from '@chakra-ui/react'
import type {AppProps} from 'next/app'
import useTelegramInitData from "@/hooks/useTelegramInitData";
import {useEffect} from "react";
import Cookies from 'js-cookie';
import {theme} from "@/application/theme";

export default function App({ Component, pageProps }: AppProps) {

    const {initData, isLoading} = useTelegramInitData();

    useEffect(()=>{
        Cookies.set('initData', initData, { expires: 30 })
    },[initData])

  return (
    <ChakraProvider theme={theme}>
        {
           !isLoading && <Component {...pageProps} />
        }

    </ChakraProvider>
  );
}
