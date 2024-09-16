import Nav from './components/Nav/nav.component';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useAuthStore from './store/useAuthStore';
import LoginPage from './pages/LoginPage';
import TodaysLunchMatePage from './pages/TodaysLunchMatePage';
import { Toaster } from './components/ui/toaster';

export const App = () => {
    const queryClient = new QueryClient();

    const CurrentMockingLayout = () => {
        return (
            <div className="flex min-h-screen w-full flex-col bg-gray-200">
                <h1 className="m-auto text-4xl text-rose-600">🚧 工事中 🚧</h1>
            </div>
        );
    };

    const Router = () => {
        const { token } = useAuthStore();

        const mockRoutes = [
            { routeName: '空いてる人', routePath: '' },
            { routeName: '投稿一覧', routePath: 'posts' },
            { routeName: 'ランチ代の申請', routePath: 'receipt-apply' },
        ];

        // router を追加する
        const router = createBrowserRouter([
            {
                path: '/login',
                element: <LoginPage />,
            },
            {
                path: '/',
                element: token ? <Nav navRouteObj={mockRoutes} /> : <Navigate to="/login" />,
                children: [
                    {
                        path: '/',
                        element: <TodaysLunchMatePage />,
                    },
                    {
                        path: 'posts',
                        element: <CurrentMockingLayout />,
                    },
                    {
                        path: 'receipt-apply',
                        element: <CurrentMockingLayout />,
                    },
                ],
            },
        ]);

        return <RouterProvider router={router} />;
    };

    return (
        <QueryClientProvider client={queryClient}>
            <Router />
            <Toaster />
        </QueryClientProvider>
    );
};

export default App;
