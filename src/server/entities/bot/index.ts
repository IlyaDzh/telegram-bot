import TelegramBot from 'node-telegram-bot-api';
import cron from 'node-cron';

import prisma from '@/server/entities/prisma';
import { generateNotificationMessage, getStartKeyboards } from '@/server/shared/utils/botUtils';

const token = process.env.BOT_TOKEN as string;

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
            userId: msg.from.id.toString(),
        },
        update: {},
        create: {
            userId: msg.from.id.toString(),
            chatId: msg.chat.id.toString(),
            username: msg.from.username || 'UNKNOWN',
            name: msg.from.first_name,
        },
    });

    if (msg.text === '/start') {
        const keyboards = getStartKeyboards(user.role);

        return bot.sendMessage(chatId, 'Привет 👋\n\nВыбирай нужную опцию и приступай к изучению материала', {
            reply_markup: {
                resize_keyboard: true,
                inline_keyboard: keyboards,
            },
        });
    }

    bot.sendMessage(chatId, 'Больше команд нет. Напиши /start чтобы начать');
});

const sendDailyNotification = async () => {
    try {
        const users = await prisma.user.findMany({
            include: {
                learningDecks: {
                    include: {
                        unknownCards: true,
                    },
                },
            },
        });

        for (const user of users) {
            const unknownCounts = user.learningDecks.reduce((acc, deck) => acc + deck.unknownCards.length, 0);

            if (unknownCounts > 0) {
                const message = generateNotificationMessage(user.username, unknownCounts);

                bot.sendMessage(user.chatId, message);
            }
        }
    } catch (error) {
        console.error('Error sending daily notification:', error);
    }
};

cron.schedule('0 12 * * *', sendDailyNotification, {
    timezone: 'Europe/Moscow',
});

export {};
