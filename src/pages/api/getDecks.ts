import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/server/entities/prisma';

const GetDeckList = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == 'GET') {
        try {
            const decks = await prisma.deck.findMany({
                include: {
                    cards: true,
                },
            });
            const results = decks.map(deck => ({
                id: deck.id,
                title: deck.title,
                category: deck.category,
                questionsCount: deck.cards.length,
            }));

            res.status(200).json(results);
        } catch (error) {
            res.status(400).json({ error });
        }
    } else {
        res.status(404).json({ error: 'Это GET метод' });
    }
};

export default GetDeckList;
