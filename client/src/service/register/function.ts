import { API_URL } from '@/types/url';
import httpApiService from '../serviceConfig';
import { PostRegisterResponseType, UserRegisterFormData } from './type';

export const handleRegisterAccountApi = async ({ data }: { data: UserRegisterFormData }) => {
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
