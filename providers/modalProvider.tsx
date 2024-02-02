"use client";

import { MatrizModal } from '@/components/Modal/MatrizModal';
import { useState, useEffect } from 'react';

export const ModalProvider = () => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, [isMounted]);

	if (!isMounted) return false;

	return (
		<>
			<MatrizModal />
		</>
	);
};
