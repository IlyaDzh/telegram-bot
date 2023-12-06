import TelegramBot from 'node-telegram-bot-api';

import prisma from '@/server/entities/prisma';
import { Role } from '@/types/user';

const token = process.env.BOT_TOKEN as string;
const URL = process.env.NEXT_PUBLIC_BASE_URL as string;

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async msg => {
    const chatId = msg.chat.id;

    if (!msg.from) {
        return;
    }

    if (msg.from.is_bot) {
        return bot.sendMessage(chatId, 'С ботами не работаем');
    }

    const user = await prisma.user.upsert({
        where: {
            id: msg.from.id,
        },
        update: {},
        create: {
            id: msg.from.id,
            username: msg.from.username || 'UNKNOWN',
            name: msg.from.first_name,
            role: Role.guest,
        },
    });

    if (msg.text === '/start') {
        const keyboards = [
            [{ text: 'Список всех колод', web_app: { url: `${URL}/decks` } }],
            [{ text: 'Изучаемые колоды', web_app: { url: `${URL}/learning-decks` } }],
        ];

        if (user.role === Role.admin) {
            keyboards.unshift([{ text: 'Создать колоду', web_app: { url: URL } }]);
        }

        return bot.sendMessage(chatId, 'Привет 👋\nВыбирай нужную опцию и приступай к изучению материала', {
            reply_markup: {
                resize_keyboard: true,
                inline_keyboard: keyboards,
            },
        });
    }

    bot.sendMessage(chatId, 'Больше команд нет. Напиши /start чтобы начать');
});

export {};
