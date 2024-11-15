import { useMutation } from '@tanstack/react-query';
import { handleLoginAccountApi } from './function';

export const useLoginMutation = () => {
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
    });

    return mutation;
};
