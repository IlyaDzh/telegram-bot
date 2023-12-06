export const getParamsFromInitData = (telegramInitData: string, param: string) => {
    const initData = new URLSearchParams(telegramInitData);
    return initData.get(param);
};
