'use client';

import { TitleHeader } from '@/components/TitleHeader';
import { useModalStore } from '@/hooks/useModalStore';
import { CardWrapper } from '../CardWrapper';
import { MatrizDB } from '@/types';

interface DashboardClientProps {
	matrizes: MatrizDB[];
}

export const DashboardClient = ({ matrizes }: DashboardClientProps) => {
	const onOpenModal = useModalStore((state) => state.onOpen);

	return (
		<>
			<div>
				<TitleHeader
					label="Painel"
					description="Gerencie suas matrizes"
					action={onOpenModal}
				/>
				<CardWrapper matrizes={matrizes}/>
			</div>
		</>
	);
};
