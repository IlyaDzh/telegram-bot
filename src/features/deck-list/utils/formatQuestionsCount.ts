export const getQuestionsCountText = (count: number) => {
    if (count === 1) return `${count} вопрос`;

    if (count <= 4) return `${count} вопроса`;

    return `${count} вопросов`;
};
