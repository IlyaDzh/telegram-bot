import { webcrypto } from 'crypto';

export async function isHashValid(data: Record<string, string>, botToken: string) {
    const encoder = new TextEncoder();

    const checkString = Object.keys(data)
        .filter(key => key !== 'hash')
        .map(key => `${key}=${data[key]}`)
        .sort()
        .join('\n');

    const secretKey = await webcrypto.subtle.importKey(
        'raw',
        encoder.encode('WebAppData'),
        { name: 'HMAC', hash: 'SHA-256' },
        true,
        ['sign'],
    );

    const secret = await webcrypto.subtle.sign('HMAC', secretKey, encoder.encode(botToken));

    const signatureKey = await webcrypto.subtle.importKey('raw', secret, { name: 'HMAC', hash: 'SHA-256' }, true, [
        'sign',
    ]);

    const signature = await webcrypto.subtle.sign('HMAC', signatureKey, encoder.encode(checkString));

    const hex = Buffer.from(signature).toString('hex');

    return data.hash === hex;
}

const CryptoJS = require('crypto-js');

export const verifyTelegramWebAppData = async (telegramInitData: string, token: string): Promise<boolean> => {
    const initData = new URLSearchParams(telegramInitData);
    const hash = initData.get('hash');
    let dataToCheck: string[] = [];

    initData.sort();
    initData.forEach((val, key) => key !== 'hash' && dataToCheck.push(`${key}=${val}`));

    const secret = CryptoJS.HmacSHA256(token, 'WebAppData');
    const _hash = CryptoJS.HmacSHA256(dataToCheck.join('\n'), secret).toString(CryptoJS.enc.Hex);

    return _hash === hash;
};
