import React from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '@/components/Login/login.component';
import useAuthStore from '@/store/useAuthStore';
import Register from '@/components/Register/register.component';
import { useUserAuthHook } from '@/hooks/useUserAuthHook';
import VerifyEmailForm from '@/components/VerifyEmailForm/verify-email-from.component';

const LoginPage = () => {
    const { token } = useAuthStore();
    const {
        handleToggleClickRegister,
        handleSubmitRegisterMail,
        handleSubmitVerificationCode,
        handleLoginButtonClick,
        registerMutation,
        isSubmitRegister,
        isClickRegister,
    } = useUserAuthHook();

    const navigate = useNavigate();

    // ログイン済みの場合は / にリダイレクト
    React.useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate]);

    const handleLoginPageRenderLogic = () => {
        if (isClickRegister) {
            return (
                <Register
                    handleToggleClickRegister={handleToggleClickRegister}
                    handleSubmitRegisterMail={handleSubmitRegisterMail}
                    isButtonDisable={registerMutation.isPending}
                />
            );
        }
        if (isSubmitRegister)
            return (
                <VerifyEmailForm
                    handleToggleClickRegister={handleToggleClickRegister}
                    handleSubmitVerificationCode={handleSubmitVerificationCode}
                />
            );

        return (
            <Login onLoginButtonClick={handleLoginButtonClick} handleToggleClickRegister={handleToggleClickRegister} />
        );
    };

    return (
        <div className="h-screen flex justify-center items-center bg-neutral-200">{handleLoginPageRenderLogic()}</div>
    );
};

export default LoginPage;
