import { create } from "zustand";

export interface pageSlice {
    pathname: string;
    setPathname: (_pathname: string) => void;
}

export const usePageSlice = create<pageSlice>(set => ({
    pathname: 'menuTrade',
    setPathname(_pathname: string) {
        set({ pathname: _pathname })
    },

}));
