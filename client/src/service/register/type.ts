export type UserRegisterFormData = {
    nickname: string;
    email: string;
    password: string;
};

export type PostRegisterResponseType = {
    message: string;
    userEmail: string;
};
