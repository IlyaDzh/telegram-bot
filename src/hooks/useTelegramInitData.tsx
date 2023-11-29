import { useEffect, useState } from 'react';

function useTelegramInitData() {
    const [initData, setInitData] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setInitData(window.Telegram.WebApp.initData)
        setIsLoading(false)
    }, []);

    return {
        initData,
        isLoading
    };
}

export default useTelegramInitData;