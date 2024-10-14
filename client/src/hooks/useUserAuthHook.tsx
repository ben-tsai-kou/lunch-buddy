import React from 'react';

export const useUserAuthHook = () => {
    const [isClickRegister, setIsClickRegister] = React.useState(false);
    const [isSubmitRegister, setIsSubmitRegister] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState({
        email: '',
        password: '',
        nickname: '',
    });

    const handleToggleClickRegister = () => {
        setIsClickRegister((prev) => !prev);
        setIsSubmitRegister(false);
    };

    const handleUpdateUserInfo = ({ key, value }: { key: string; value: string }) => {
        setUserInfo((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    // TODO - handle register with react query
    const handleSubmitRegisterMail = () => {
        setIsClickRegister(false);
        setIsSubmitRegister(true);

        console.log('isSubmitRegister', isSubmitRegister);
    };

    // TODO - handle send verify code with react query
    const handleSubmitVerifyCode = () => {
        console.log('isSubmitRegister', isSubmitRegister);
    };

    return {
        isSubmitRegister,
        isClickRegister,
        setIsClickRegister,
        handleToggleClickRegister,
        userInfo,
        setUserInfo,
        handleUpdateUserInfo,
        handleSubmitRegisterMail,
        handleSubmitVerifyCode,
    };
};
