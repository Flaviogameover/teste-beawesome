"use client";

import { CreateMatrizModal } from '@/components/Modal/CreateMatrizModal';
import { useState, useEffect } from 'react';

export const ModalProvider = () => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, [isMounted]);

	if (!isMounted) return false;

	return (
		<>
			<CreateMatrizModal />
		</>
	);
};
