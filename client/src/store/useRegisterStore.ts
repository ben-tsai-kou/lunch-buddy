import { create } from 'zustand';
import { RegisterStoreType } from '../types/store';

export const useRegisterStore = create<RegisterStoreType>((set) => ({}));
