import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/server/entities/prisma';
import { getParamsFromInitData } from '@/server/shared/utils/getParamsFromInitData';

const GetLearningDecks = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == 'GET') {
        const userParams = getParamsFromInitData(req.cookies.initData || '', 'user');

        try {
            if (!userParams) {
                throw new Error('Пользователь не идентифицирован');
            }

            const userId = JSON.parse(userParams).id.toString();

            const user = await prisma.user.findFirst({
                where: {
                    id: userId,
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
            console.log('[...user.learningDecks]', data);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);

            res.status(400).json({ error });
        }
    } else {
        res.status(404).json({ error: 'Это GET метод' });
    }
};

export default GetLearningDecks;
