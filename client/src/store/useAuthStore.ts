import { create } from 'zustand';
import { AuthStoreType } from '../types/store';

const useAuthStore = create<AuthStoreType>((set) => ({
    token: null,
    setToken: (token) => set({ token }),
}));

export default useAuthStore;
