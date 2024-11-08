export type UseStoreType = {
    count: number;
    inc: () => void;
};

export type AuthStoreType = {
    token: string | null;
    setToken: (token: AuthStoreType['token']) => void;
};

export type RegisterStoreType = {
    isLoading: boolean;
    isClickRegister: boolean;
    isSubmitRegister: boolean;
    currentRegisterUserEmail: string;

    setIsLoading: (loadingState: boolean) => void;
    setIsClickRegister: (loadingState: boolean) => void;
    setIsSubmitRegister: (loadingState: boolean) => void;
    setCurrentRegisterUserEmail: (email: string) => void;
};
