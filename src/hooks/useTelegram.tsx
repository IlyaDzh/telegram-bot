import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { TelegramWebApps } from 'telegram-webapps-types';
import Cookies from 'js-cookie';
import axios, { AxiosResponse } from 'axios';

import { User } from '@/types/user';

export interface ITelegramContext {
    webApp: TelegramWebApps.WebApp | null;
    initData: TelegramWebApps.WebApp['initData'];
    user: User | null;
    isLoading: boolean;
    isError: boolean;
}

export const TelegramContext = createContext<ITelegramContext>({
    initData: '',
    isLoading: false,
    isError: false,
    webApp: null,
    user: null,
});

export const TelegramProvider = ({ children }: { children: React.ReactNode }) => {
    const [webApp, setWebApp] = useState<TelegramWebApps.WebApp | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const app = (window as any).Telegram?.WebApp as TelegramWebApps.WebApp;

        if (app) {
            app.ready();
            setWebApp(app);

            Cookies.set('initData', app.initData, { expires: 30 });

            axios
                .get('/api/getMe')
                .then((data: AxiosResponse<User>) => {
                    setUser(data.data);
                })
                .catch(() => {
                    setIsError(true);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, []);

    const value = useMemo(() => {
        return {
            webApp,
            initData: webApp ? webApp.initData : '',
            user,
            isLoading,
            isError,
        };
    }, [isError, isLoading, user, webApp]);

    return <TelegramContext.Provider value={value}>{children}</TelegramContext.Provider>;
};

export const useTelegram = () => useContext(TelegramContext);
