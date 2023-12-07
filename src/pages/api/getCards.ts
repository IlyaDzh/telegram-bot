import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/server/entities/prisma';
import { getErrorMessage } from '@/server/shared/utils/getErrorMessage';
import middleware from '@/server/shared/utils/_middleware';

const GetCards = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == 'GET') {
        try {
            const cards = await prisma.card.findMany({
                where: {
                    deckId: req.query.deckId as string,
                },
            });

            res.status(200).json(cards);
        } catch (error) {
            res.status(400).json({ error: getErrorMessage(error) });
        }
    } else {
        res.status(404).json({ error: 'Метод не найден' });
    }
};

export default middleware(GetCards);
