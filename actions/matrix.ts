'use server';

import { auth } from '@clerk/nextjs';
import { ReturnType, TMatriz } from '@/types';

type HandlerProps = {
	matriz: TMatriz;
};

export const handler = async ({matriz}: HandlerProps): Promise<ReturnType> => {
	try {
		const { userId } = auth();

		if (!userId)
			return {
				success: false,
				error: 'Você precisa estar logado!',
			};

		return {
			success: true,
			message: 'Matriz criada!',
			data: matriz,
		};
	} catch (error) {
		console.log('[CREATE_MATRIZ_ERROR]', error);
		return {
			success: false,
			error: 'Ocorreu um erro!',
		};
	}
};
