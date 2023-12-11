export enum Role {
    admin = 0,
    user = 1,
    guest = 2,
}

export interface User {
    id: string;
    userId: string;
    chatId: string;
    name: string;
    username: string;
    role: Role;
}
