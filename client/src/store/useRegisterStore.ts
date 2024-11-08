import { create } from 'zustand';
import { RegisterStoreType } from '../types/store';

export const useRegisterStore = create<RegisterStoreType>((set) => ({
    isLoading: false,
    isClickRegister: false,
    isSubmitRegister: false,
    currentRegisterUserEmail: '',

    setIsLoading: (loadingState) =>
        set(() => ({
            isLoading: loadingState,
        })),
    setIsClickRegister: (loadingState) =>
        set(() => ({
            isClickRegister: loadingState,
        })),
    setIsSubmitRegister: (loadingState) =>
        set(() => ({
            isSubmitRegister: loadingState,
        })),
    setCurrentRegisterUserEmail: (email) =>
        set(() => ({
            currentRegisterUserEmail: email,
        })),
}));
