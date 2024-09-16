import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

type MockingApiFetchingType<T> = {
    callback: () => T;
    timer: number;
};

export const handleMockingApiFetching = <T>({ callback, timer }: MockingApiFetchingType<T>): Promise<T> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = callback();
            resolve(data);
        }, timer);
    });
};
