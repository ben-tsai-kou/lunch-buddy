import React from 'react';
import { useRegisterMutation } from '@/service/login/register';
import { useVerifyMutation } from '@/service/login/verify';
import { useLoginMutation } from '@/service/login/login';

export const useUserAuthHook = () => {
    const [isClickRegister, setIsClickRegister] = React.useState(false);
    const [isSubmitRegister, setIsSubmitRegister] = React.useState(false);
    const [currentRegisterUserEmail, setCurrentRegisterUserEmail] = React.useState('');

    const registerMutation = useRegisterMutation();
    const verifyMutation = useVerifyMutation();
    const loginMutation = useLoginMutation();

    const handleLoginButtonClick = async (loginInfoValue: { email: string; password: string }) => {
        try {
            await loginMutation.mutateAsync({ data: loginInfoValue });
        } catch (error) {
            console.log('error', error);
        }
    };

    const handleToggleClickRegister = () => {
        setIsClickRegister(!isClickRegister);
        setIsSubmitRegister(false);
    };

    const handleSubmitRegisterMail = async (data: { email: string; password: string; nickname: string }) => {
        try {
            const response = await registerMutation.mutateAsync({ data });
            setCurrentRegisterUserEmail(response.userEmail);
            setIsClickRegister(false);
            setIsSubmitRegister(true);
        } catch (error) {
            console.log('error', error);
        }
    };

    const handleSubmitVerificationCode = async (userInfo: { verificationCode: string }) => {
        try {
            const response = await verifyMutation.mutateAsync({
                data: {
                    email: currentRegisterUserEmail,
                    verificationCode: userInfo?.verificationCode,
                },
            });

            if (response.message === 'success') {
                setIsClickRegister(false);
                setIsSubmitRegister(false);
            }
        } catch (error) {
            console.log('error');
        }
    };

    return {
        isClickRegister,
        isSubmitRegister,
        handleLoginButtonClick,
        setIsClickRegister,
        setIsSubmitRegister,
        handleToggleClickRegister,
        handleSubmitRegisterMail,
        handleSubmitVerificationCode,
        registerMutation,
    };
};
