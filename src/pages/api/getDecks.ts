import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/server/entities/prisma';
import { getErrorMessage } from '@/server/shared/utils/getErrorMessage';
import middleware from '@/server/shared/utils/_middleware';
import { getParamsFromInitData } from '@/server/shared/utils/getParamsFromInitData';

const GetDeckList = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == 'GET') {
        try {
            const userParams = getParamsFromInitData(req.cookies.initData || '', 'user');

            if (!userParams) {
                throw new Error('Пользователь не идентифицирован');
            }

            const userId = JSON.parse(userParams).id.toString();

            const decks = await prisma.deck.findMany({
                include: {
                    cards: true,
                },
            });

            const userlearningDecks = await prisma.learningDeck.findMany({
                select: {
                    deck: {
                        select: {
                            id: true,
                        },
                    },
                },
                where: {
                    userId: userId,
                },
            });

            const learningDecksIds = userlearningDecks.map(({ deck }) => deck.id);

            const results = decks.map(deck => ({
                id: deck.id,
                title: deck.title,
                category: deck.category,
                questionsCount: deck.cards.length,
                isNew: !learningDecksIds.includes(deck.id),
            }));

            res.status(200).json(results);
        } catch (error) {
            res.status(400).json({ error: getErrorMessage(error) });
        }
    } else {
        res.status(404).json({ error: 'Метод не найден' });
    }
};

export default middleware(GetDeckList);
