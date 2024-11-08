import React from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '@/components/Login/login.component';
import useAuthStore from '@/store/useAuthStore';
import { handleMockingApiFetching } from '@/lib/utils';
import Register from '@/components/Register/register.component';
import { useUserAuthHook } from '@/hooks/useUserAuthHook';
import VerifyEmailForm from '@/components/VerifyEmailForm/verify-email-from.component';
import { useRegisterStore } from '@/store/useRegisterStore';

const LoginPage = () => {
    const { token, setToken } = useAuthStore();
    const { isSubmitRegister, isClickRegister } = useRegisterStore((state) => state);
    const { handleToggleClickRegister, handleUpdateUserInfo, handleSubmitRegisterMail, registerMutation } =
        useUserAuthHook();
    const navigate = useNavigate();

    const handleMockingLogin = () => {
        return handleMockingApiFetching({ callback: () => true, timer: 500 });
    };

    const handleLoginButtonClick = async () => {
        // ログイン API を呼び出す
        try {
            const data = await handleMockingLogin();
            setToken('token');
        } catch (e) {
            console.log(e);
        }
    };

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
                    handleUpdateUserInfo={handleUpdateUserInfo}
                    handleSubmitRegisterMail={handleSubmitRegisterMail}
                    isButtonDisable={registerMutation.isPending}
                />
            );
        }
        if (isSubmitRegister)
            return (
                <VerifyEmailForm
                    handleToggleClickRegister={handleToggleClickRegister}
                    handleUpdateUserInfo={handleUpdateUserInfo}
                    handleSubmitRegisterMail={handleSubmitRegisterMail}
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
