export type UserRegisterFormData = {
    nickname: string;
    email: string;
    password: string;
    verificationCode: string;
};

export type PostRegisterResponseType = {
    message: string;
    userEmail: string;
};
