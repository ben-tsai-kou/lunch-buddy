import { API_URL } from '@/types/url';
import { PostRegisterResponseType, UserRegisterFormData } from './type';
import httpApiService from '@/service/serviceConfig';

export const handleRegisterAccountApi = async ({ data }: { data: Omit<UserRegisterFormData, 'verificationCode'> }) => {
    try {
        const res = await httpApiService.POST<PostRegisterResponseType>({
            url: API_URL.LOGIN_REGISTER,
            data,
        });
        return res;
    } catch (error) {
        throw new Error('error');
    }
};
