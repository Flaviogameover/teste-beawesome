import { TMatriz } from '@/types';
import { create } from 'zustand';


type ModalState = {
	isOpen: boolean;
	triangle?: TMatriz;
	id?: string;
	onOpen: (id?: string, trinagle?: TMatriz) => void;
	onClose: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
	isOpen: false,
	triangle: undefined,
	id: undefined,
	onOpen: (id?: string, triangle?: TMatriz) =>
		set({ isOpen: true, triangle, id }),
	onClose: () => set({ isOpen: false, triangle: undefined, id: undefined }),
}));
