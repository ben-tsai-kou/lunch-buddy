export type UseStoreType = {
    count: number;
    inc: () => void;
};

export type AuthStoreType = {
    token: string | null;
    setToken: (token: AuthStoreType['token']) => void;
};

export type RegisterStoreType = {};
