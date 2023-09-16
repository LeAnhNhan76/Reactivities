export type LoginType = {
    userName: string;
    password: string;
}

export type LoginResultType = {
    userId: string;
    userName: string;
    isLoggedIn: boolean;
    token: string;
    displayName: string;
    avatar: string;
}