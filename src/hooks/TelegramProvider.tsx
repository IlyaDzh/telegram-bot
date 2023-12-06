import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { TelegramWebApps } from 'telegram-webapps-types';
import Cookies from 'js-cookie';

import { User } from '@/types/user';

export interface ITelegramContext {
    webApp: TelegramWebApps.WebApp | null;
    initData: TelegramWebApps.WebApp['initData'];
    user: User | null;
    isLoading: boolean;
}

const fetchUserData = async () => {
    return await fetch('/api/getMe', {
        method: 'GET',
    }).then(res => res.json());
};

export const TelegramContext = createContext<ITelegramContext>({
    initData: '',
    isLoading: false,
    webApp: null,
    user: null,
});

export const TelegramProvider = ({ children }: { children: React.ReactNode }) => {
    const [webApp, setWebApp] = useState<TelegramWebApps.WebApp | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const app = (window as any).Telegram?.WebApp as TelegramWebApps.WebApp;

        if (app) {
            app.ready();
            setWebApp(app);

            Cookies.set('initData', app.initData, { expires: 30 });

            fetchUserData().then(data => {
                setUser(data);
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
        };
    }, [isLoading, user, webApp]);

    return <TelegramContext.Provider value={value}>{children}</TelegramContext.Provider>;
};

export const useTelegram = () => useContext(TelegramContext);
