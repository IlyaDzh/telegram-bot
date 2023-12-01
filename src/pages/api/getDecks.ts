import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/server/entities/prisma';

const GetDeckList = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == 'GET') {
        try {
            const results = await prisma.deck.findMany();

            res.status(201).json(results);
        } catch (error) {
            res.status(400).json({ error });
        }
    } else {
        res.status(404).json({ error: 'Это GET метод' });
    }
};

export default GetDeckList;
