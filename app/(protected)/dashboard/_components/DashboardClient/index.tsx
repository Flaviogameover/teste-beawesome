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
	if (!matrizes || matrizes.length < 1) {
		return (
			<>
				<div>
					<TitleHeader
						label="Painel"
						description="Gerencie suas matrizes"
						action={onOpenModal}
					/>
					<div className="my-5 p-3 flex justify-center">
						<h2 className='font-semibold text-lg'>- As matrizes criadas aparecerão aqui! -</h2>
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			<div>
				<TitleHeader
					label="Painel"
					description="Gerencie suas matrizes"
					action={onOpenModal}
				/>
				<CardWrapper matrizes={matrizes} />
			</div>
		</>
	);
};
