import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/server/entities/prisma';
import { getErrorMessage } from '@/server/shared/utils/getErrorMessage';
import middleware from '@/server/shared/utils/_middleware';

const CreateDeck = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == 'POST') {
        const { title, category, cards } = req.body;

        try {
            await prisma.deck.create({
                data: {
                    title: title,
                    category: category,
                    cards: {
                        create: cards,
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

export default middleware(CreateDeck);
