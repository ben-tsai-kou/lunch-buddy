import { useMutation } from '@tanstack/react-query';
import { handleRegisterVerification } from './function';
import { VerifyMutationType } from './type';

export const useVerifyMutation = () => {
    const mutation = useMutation({
        mutationFn: ({ data }: { data: VerifyMutationType }) => {
            return handleRegisterVerification({ data });
        },
    });

    return mutation;
};
