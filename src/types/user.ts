export enum Role {
    Admin = 'Admin',
    User = 'User',
}

export interface User {
    id: string;
    userId: string;
    chatId: string;
    name: string;
    username: string;
    role: Role;
}
