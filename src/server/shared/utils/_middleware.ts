import { NextApiRequest, NextApiResponse } from 'next';

import { verifyTelegramWebAppData } from '@/server/shared/utils/validationUtils';

const middleware =
    (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) =>
    async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const isValid = await verifyTelegramWebAppData(req.cookies.initData || '');

            if (!isValid) {
                return res.status(401).json({ error: 'Доступ запрещен: неверные данные' });
            }

            await handler(req, res);
        } catch (error) {
            return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    };

export default middleware;
