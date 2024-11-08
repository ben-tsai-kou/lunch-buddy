import { useRegisterMutation } from '@/service/register';
import { useRegisterStore } from '@/store/useRegisterStore';
import React from 'react';

export const useUserAuthHook = () => {
    const { isClickRegister, setIsClickRegister, setIsSubmitRegister, setCurrentRegisterUserEmail } = useRegisterStore(
        (state) => state
    );

    const [userInfo, setUserInfo] = React.useState({
        email: '',
        password: '',
        nickname: '',
    });

    const registerMutation = useRegisterMutation();

    const handleToggleClickRegister = () => {
        setIsClickRegister(!isClickRegister);
        setIsSubmitRegister(false);
    };

    const handleUpdateUserInfo = ({ key, value }: { key: string; value: string }) => {
        setUserInfo((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmitRegisterMail = async () => {
        try {
            const response = await registerMutation.mutateAsync({ data: userInfo });
            setCurrentRegisterUserEmail(response.userEmail);
            setIsClickRegister(false);
            setIsSubmitRegister(true);
        } catch (error) {
            console.log('error', error);
        }
    };

    // TODO - handle send verify code with react query
    const handleSubmitVerifyCode = () => {
        console.log('isSubmitRegister');
    };

    return {
        handleToggleClickRegister,
        handleUpdateUserInfo,
        handleSubmitRegisterMail,
        handleSubmitVerifyCode,
        registerMutation,
    };
};
