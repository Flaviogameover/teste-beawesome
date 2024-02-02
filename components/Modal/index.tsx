'use client';

import { Dialog } from '@/components/ui/dialog';
import { useEffect, useState } from 'react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, [isMounted]);

	if (!isMounted) return false;

	return (
		<Dialog onOpenChange={onClose} open={isOpen}>
			{children}
		</Dialog>
	);
};
