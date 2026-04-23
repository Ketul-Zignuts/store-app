export interface AuthTokens {
    access_token: string;
    refresh_token: string;
}
export interface User {
    id: number;
    email: string;
    name: string;
    avatar: string;
    creationAt: string;
    updatedAt: string;
    password: string;
    role: string;
}