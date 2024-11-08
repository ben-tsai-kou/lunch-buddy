import { useMutation } from '@tanstack/react-query';
import { UserRegisterFormData } from './type';
import { handleRegisterAccountApi } from './function';
import { useRegisterStore } from '@/store/useRegisterStore';

export const useRegisterMutation = () => {
    const { setIsClickRegister, setIsSubmitRegister, setCurrentRegisterUserEmail } = useRegisterStore((state) => state);
    const mutation = useMutation({
        mutationFn: ({ data }: { data: UserRegisterFormData }) => {
            return handleRegisterAccountApi({ data });
        },
        onSuccess: (data) => {
            setCurrentRegisterUserEmail(data.userEmail);
            setIsClickRegister(false);
            setIsSubmitRegister(true);
        },
    });

    return mutation;
};
