import TelegramBot from 'node-telegram-bot-api';
import prisma from '@/server/entities/prisma';
import { Role } from '@/server/entities/bot/types/user';

const token = process.env.BOT_TOKEN as string;
const URL = process.env.NEXT_PUBLIC_BASE_URL as string;

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async msg => {
    // Фильтруем ботов
    const chatId = msg.chat.id;
    if (!msg.from) {
        return;
    }
    if (msg.from.is_bot) {
        return bot.sendMessage(chatId, 'С ботами не работаем');
    }

    // Теневая регистрация, нужна для индентификации в веб-апп
    await prisma.user.upsert({
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
        return bot.sendMessage(chatId, 'Старт', {
            reply_markup: {
                resize_keyboard: true,
                inline_keyboard: [
                    [{ text: 'Создать доску', web_app: { url: URL } }],
                    [{ text: 'Список колод', web_app: { url: `${URL}/decks` } }],
                ],
            },
        });
    }
    bot.sendMessage(chatId, 'Больше команд нет');
});

export {};
