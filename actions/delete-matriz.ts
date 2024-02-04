'use server';

import { prismadb } from '../lib/prismadb';
import { ReturnType } from '@/types';
import { auth } from '@clerk/nextjs';

/**
 * @param {string} param.id - Recebe o id do item
 * @description Após invocada, a função irá filtrar os dados para deletar o item pelo id
 * @returns {Promise<ReturnType>} - Retorna a resposta da ação
 */
export const handler = async ({
	id,
	isTest,
}: {
	id?: string;
	isTest?: boolean;
}): Promise<ReturnType> => {
	try {
		let userId: string | null;
		if (isTest) {
			userId = '1';
		} else {
			const user = auth();
			userId = user.userId;
		}
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

		if (isTest) {
			if(id !== '1') {
				return {
					success: false,
					error: 'Ocorreu um erro!',
				};
			}
			return {
				success: true,
				message: 'Matriz deletada!',
			};
		}

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
