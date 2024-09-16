import { create } from 'zustand';
import { UseStoreType } from '../types/store';

const useStore = create<UseStoreType>((set) => ({
    count: 1,
    inc: () => set((state: UseStoreType) => ({ count: state.count + 1 })),
}));
