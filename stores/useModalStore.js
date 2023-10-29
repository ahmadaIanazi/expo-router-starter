import { create } from 'zustand';

export const useModalStore = create((set, get) => ({
  open: false,
  data: null,
  type: -1,
  modalClose: null,
  getModalClose: (res) => {
    set({ modalClose: res });
  },
  modalOpen: (res) => {
    set((state) => ({ ...state.open, open: res }));
  },
  modalData: (res) => {
    set((state) => ({ ...state.data, data: res }));
  },
  modalType: (res) => {
    set((state) => ({ ...state.type, type: res }));
  },
}));
