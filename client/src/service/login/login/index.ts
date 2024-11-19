import { useMutation } from '@tanstack/react-query';
import { handleLoginAccountApi } from './function';
import useAuthStore from '@/store/useAuthStore';

export const useLoginMutation = () => {
    const { setToken } = useAuthStore();
    const mutation = useMutation({
        mutationFn: ({
            data,
        }: {
            data: {
                email: string;
                password: string;
            };
        }) => {
            return handleLoginAccountApi({ data });
        },
        onSuccess: (data: { message: string; token: string }) => {
            if (data.message === 'success') {
                // TODO: setup refresh token logic here
                setToken(data.token);
            }
        },
    });

    return mutation;
};
