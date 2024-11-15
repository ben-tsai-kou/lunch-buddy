import httpApiService from '@/service/serviceConfig';
import { API_URL } from '@/types/url';

export const handleLoginAccountApi = async ({ data }: { data: { email: string; password: string } }) => {
    try {
        const res = await httpApiService.POST<{ message: string }>({
            url: API_URL.LOGIN_USER_LOGIN,
            data,
        });
        return res;
    } catch (error) {
        throw new Error('error');
    }
};
