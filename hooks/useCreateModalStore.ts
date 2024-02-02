import { create } from 'zustand';

type TMatriz = number[][];

type CreateModalStore = {
	isOpen: boolean;
	triangle?: TMatriz;
	id?: string;
	onOpen: (id?: string, trinagle?: TMatriz) => void;
	onClose: () => void;
};

export const useCreateModal = create<CreateModalStore>((set) => ({
	isOpen: false,
	triangle: undefined,
	id: undefined,
	onOpen: (id?: string, triangle?: TMatriz) =>
		set({ isOpen: true, triangle, id }),
	onClose: () => set({ isOpen: false, triangle: undefined, id: undefined }),
}));
