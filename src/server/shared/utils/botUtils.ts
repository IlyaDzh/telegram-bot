import { Role } from '@/types/user';

const URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const generateNotificationMessage = (username: string, unknownCounts: number) => {
    let part = '';

    if (unknownCounts === 1) {
        part = `У тебя есть ${unknownCounts} вопрос, который ты не знаешь!`;
    } else if (unknownCounts >= 2 && unknownCounts <= 4) {
        part = `У тебя есть ${unknownCounts} вопроса, которые ты не знаешь!`;
    } else {
        part = `У тебя есть ${unknownCounts} вопросов, которые ты не знаешь!`;
    }

    return `Привет, ${username}! 🌟 \n\n${part} \n\nПереходи в приложение /start, чтобы быстрее ответить на них. Удачи! 💪`;
};

export const getStartKeyboards = (role: Role) => {
    const keyboards = [
        [{ text: 'Список всех колод', web_app: { url: `${URL}/decks` } }],
        [{ text: 'Изучаемые колоды', web_app: { url: `${URL}/learning-decks` } }],
    ];

    if (role === Role.admin) {
        keyboards.unshift([{ text: 'Создать колоду', web_app: { url: `${URL}/` } }]);
    }

    return keyboards;
};
