import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/server/entities/prisma';
import { getErrorMessage } from '@/server/shared/utils/getErrorMessage';
import middleware from '@/server/shared/utils/_middleware';
import { getParamsFromInitData } from '@/server/shared/utils/getParamsFromInitData';
import { Role } from '@/types/user';

const CreateDeck = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == 'POST') {
        const { title, category, difficulty, cards } = req.body;

        const userParams = getParamsFromInitData(req.cookies.initData || '', 'user');

        try {
            if (!userParams) {
                throw new Error('Пользователь не идентифицирован');
            }

            const userId = JSON.parse(userParams).id.toString();

            const user = await prisma.user.findFirst({
                where: {
                    userId: userId,
                },
            });

            if (!user) {
                throw new Error('Пользователь не найден');
            }

            if (user.role !== Role.Admin) {
                throw new Error('У вас нет прав на создание колоды');
            }

            await prisma.deck.create({
                data: {
                    title: title,
                    category: category,
                    difficulty: difficulty,
                    authorId: userId,
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
