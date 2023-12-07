import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/server/entities/prisma';
import { getParamsFromInitData } from '@/server/shared/utils/getParamsFromInitData';
import { getErrorMessage } from '@/server/shared/utils/getErrorMessage';
import middleware from '@/server/shared/utils/_middleware';

const CreateLearningDeck = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == 'POST') {
        const { deckId, knownIds, unknownIds } = req.body;

        const userParams = getParamsFromInitData(req.cookies.initData || '', 'user');

        try {
            if (!userParams) {
                throw new Error('Пользователь не идентифицирован');
            }

            const userId = JSON.parse(userParams).id.toString();

            await prisma.learningDeck.upsert({
                include: {
                    deck: true,
                    knownCards: true,
                    unknownCards: true,
                },
                where: {
                    deckId_userId: {
                        deckId: deckId,
                        userId: userId,
                    },
                },
                create: {
                    deckId: deckId,
                    userId: userId,
                    knownCards: {
                        connect: knownIds.map((id: string) => ({ id })),
                    },
                    unknownCards: {
                        connect: unknownIds.map((id: string) => ({ id })),
                    },
                },
                update: {
                    knownCards: {
                        set: [],
                        connect: knownIds.map((id: string) => ({ id })),
                    },
                    unknownCards: {
                        set: [],
                        connect: unknownIds.map((id: string) => ({ id })),
                    },
                },
            });

            res.status(201).json({ status: true });
        } catch (error) {
            res.status(400).json({ error: getErrorMessage(error) });
        }
    } else {
        res.status(404).json({ error: 'Метод не найден' });
    }
};

export default middleware(CreateLearningDeck);
