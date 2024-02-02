'use client';

import { Dialog } from '@/components/ui/dialog';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
	return (
		<Dialog onOpenChange={onClose} open={isOpen}>
			{children}
		</Dialog>
	);
};
