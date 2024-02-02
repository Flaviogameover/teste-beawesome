'use client';

import { TitleHeader } from '@/components/TitleHeader';
import { CardWrapper } from '../CardWrapper';
import { useCreateModal } from '@/hooks/useCreateModalStore';
import { CreateMatrizModal } from '@/components/Modal/CreateMatrizModal';

export const DashboardClient = () => {
	const onOpenModal = useCreateModal((state) => state.onOpen);

	return (
		<>
			<div>
				<TitleHeader
					label="Painel"
					description="Gerencie suas matrizes"
					action={onOpenModal}
				/>
				<CardWrapper />
			</div>
		</>
	);
};
