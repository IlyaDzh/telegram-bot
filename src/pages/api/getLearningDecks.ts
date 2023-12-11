import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/server/entities/prisma';
import { getParamsFromInitData } from '@/server/shared/utils/getParamsFromInitData';
import { getErrorMessage } from '@/server/shared/utils/getErrorMessage';
import middleware from '@/server/shared/utils/_middleware';

const GetLearningDecks = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const userParams = getParamsFromInitData(req.cookies.initData || '', 'user');

            if (!userParams) {
                throw new Error('Пользователь не идентифицирован');
            }

            const userId = JSON.parse(userParams).id.toString();

            const user = await prisma.user.findFirst({
                where: {
                    userId: userId,
                },
                include: {
                    learningDecks: {
                        include: {
                            knownCards: true,
                            unknownCards: true,
                            deck: true,
                        },
                    },
                },
            });

            if (!user) {
                throw new Error('Пользователь не найден');
            }

            const data = [...user.learningDecks];

            res.status(200).json(data);
        } catch (error) {
            res.status(400).json({ error: getErrorMessage(error) });
        }
    } else {
        res.status(404).json({ error: 'Метод не найден' });
    }
};

export default middleware(GetLearningDecks);
