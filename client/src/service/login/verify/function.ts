import httpApiService from '@/service/serviceConfig';
import { API_URL } from '@/types/url';
import { VerifyMutationType } from './type';

export const handleRegisterVerification = async ({ data }: { data: VerifyMutationType }) => {
    try {
        const res = await httpApiService.POST<{ message: string }>({
            url: API_URL.LOGIN_VERIFY,
            data,
        });
        return res;
    } catch (error) {
        throw new Error('error');
    }
};
