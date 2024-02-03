'use server';

import { prismadb } from '@/lib/prismadb';
import { ReturnType } from '@/types';
import { auth } from '@clerk/nextjs';

export const handler = async ({ id }: { id: string }): Promise<ReturnType> => {
	try {
		const { userId } = auth();
		if (!userId)
			return {
				success: false,
				error: 'Você precisa estar logado!',
			};

		if (!id)
			return {
				success: false,
				error: 'Id inválido!',
			};

		const data = await prismadb.matriz.findUnique({
			where: {
				id,
				userId,
			},
		});

		if (!data)
			return {
				success: false,
				error: 'Ocorreu um erro!',
			};

		await prismadb.matriz.delete({
			where: {
				id,
				userId,
			},
		});

		return {
			success: true,
			message: 'Matriz deletada!',
		};
	} catch (error) {
		console.log('[DELETE_MATRIZ_ERROR]', error);
		return {
			success: false,
			error: 'Ocorreu um erro!',
		};
	}
};
