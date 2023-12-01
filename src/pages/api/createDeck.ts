import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/server/entities/prisma';

const CreateDeck = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == 'POST') {
        const { name, category, cards } = req.body;
console.log('cards', cards);

        try {
            await prisma.deck.create({
                data: {
                    name: name,
                    category: category,
                    cards: {
                        create: cards,
                    },
                },
            });

            res.status(201).json({ status: true });
        } catch (error) {
            res.status(400).json({ error });
        }
    } else {
        res.status(404).json({ error: 'Это POST метод' });
    }
};

export default CreateDeck;
