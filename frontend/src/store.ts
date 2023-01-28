import {create} from 'zustand';

export const useData = create((set) => ({
    id: 0, 
    rooms : {},
}));
