import React from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '@/components/Login/login.component';
import useAuthStore from '@/store/useAuthStore';
import { handleMockingApiFetching } from '@/lib/utils';

const LoginPage = () => {
    const { token, setToken } = useAuthStore();
    const [isLoading, setIsLoading] = React.useState(false);
    const navigate = useNavigate();

    const handleMockingLogin = () => {
        setIsLoading(true);
        return handleMockingApiFetching({ callback: () => true, timer: 500 });
    };

    const handleLoginButtonClick = async () => {
        // ログイン API を呼び出す
        try {
            const data = await handleMockingLogin();
            setIsLoading(data);
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

    return (
        <div className="h-screen flex justify-center items-center bg-neutral-200">
            <Login onLoginButtonClick={handleLoginButtonClick} isLoading={isLoading} />
        </div>
    );
};

export default LoginPage;
