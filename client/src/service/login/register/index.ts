import { useMutation } from '@tanstack/react-query';
import { UserRegisterFormData } from './type';
import { handleRegisterAccountApi } from './function';

export const useRegisterMutation = () => {
    const mutation = useMutation({
        mutationFn: ({ data }: { data: Omit<UserRegisterFormData, 'verificationCode'> }) => {
            return handleRegisterAccountApi({ data });
        },
        onSuccess: () => {},
    });

    return mutation;
};
