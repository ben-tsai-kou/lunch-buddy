import { useRegisterMutation } from '@/service/login/register';
import { useVerifyMutation } from '@/service/login/verify';
import { UserRegisterFormDataKey } from '@/types/LoginUserInput';
import React from 'react';

export const useUserAuthHook = () => {
    const [isClickRegister, setIsClickRegister] = React.useState(false);
    const [isSubmitRegister, setIsSubmitRegister] = React.useState(false);
    const [currentRegisterUserEmail, setCurrentRegisterUserEmail] = React.useState('');

    const registerMutation = useRegisterMutation();
    const verifyMutation = useVerifyMutation();

    const [userInfo, setUserInfo] = React.useState({
        email: '',
        password: '',
        nickname: '',
        verificationCode: '',
    });

    const handleToggleClickRegister = () => {
        setIsClickRegister(!isClickRegister);
        setIsSubmitRegister(false);
    };

    const handleUpdateUserInfo = ({ key, value }: { key: UserRegisterFormDataKey; value: string }) => {
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

    const handleSubmitVerificationCode = async () => {
        try {
            const response = await verifyMutation.mutateAsync({
                data: {
                    email: currentRegisterUserEmail,
                    verificationCode: userInfo.verificationCode,
                },
            });

            if (response.message === 'success') {
                // setIsSubmitRegister(false);
                console.log('isSubmitRegister');
            }
        } catch (error) {}
    };

    return {
        isClickRegister,
        isSubmitRegister,
        setIsClickRegister,
        setIsSubmitRegister,
        handleToggleClickRegister,
        handleUpdateUserInfo,
        handleSubmitRegisterMail,
        handleSubmitVerificationCode,
        registerMutation,
    };
};
