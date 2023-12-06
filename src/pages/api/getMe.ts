import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/server/entities/prisma';
import { getParamsFromInitData } from '@/server/shared/utils/getParamsFromInitData';

const GetMe = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == 'GET') {
        const userParams = getParamsFromInitData(req.cookies.initData || '', 'user');

        try {
            if (!userParams) {
                throw new Error('Пользователь не идентифицирован');
            }

            const user = await prisma.user.findFirst({
                where: {
                    id: JSON.parse(userParams).id,
                },
            });

            if (!user) {
                throw new Error('Пользователь не найден');
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ error });
        }
    } else {
        res.status(404).json({ error: 'Это GET метод' });
    }
};

export default GetMe;
