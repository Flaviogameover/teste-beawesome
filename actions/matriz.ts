'use server';

import { auth } from '@clerk/nextjs';
import { ReturnType, TMatriz } from '@/types';
import { prismadb } from '@/lib/prismadb';

/**
 * @param {TMatriz} param - Recebe uma matriz
 * @description Após invocada, checa se o array é valido
 * @returns {boolean} - Retorna um bool
 */

const checkMatriz = (matriz: TMatriz): boolean => {
	if (matriz[0].length !== 1) return false;
	return Array.isArray(matriz) && Array.isArray(matriz[0]);
};

interface Step {
	time: string;
}

type TSumMatriz = {
	sum?: number;
	path?: number[];
	steps?: Step[];
	method?: string;
	total?: string;
	success: boolean;
};

/**
 * @param {TMatriz} param - Recebe uma matriz
 * @description Após invocada, a função irá filtrar os dados e retornar um array bidimensional
 * @returns {TSumMatriz} - Retorna os objetos para inserção no bd: sum, path, steps, method, total, success
 */

const formatMatriz = (values: TMatriz): TSumMatriz => {
	let sum: number = 0;
	let lastIndex: number = 0;
	let indexArr: number[] = [];
	let steps: Step[] = [];
	let total: number = 0;
	if (!checkMatriz(values)) {
		return {
			success: false,
		};
	}

	try {
		for (let i = 0; i < values.length; i++) {
			let arr = values[i];

			let startTime = performance.now();

			let maxArr = Math.max(...arr.slice(lastIndex, lastIndex + 2));
			sum += maxArr;
			lastIndex = arr.indexOf(maxArr, lastIndex);

			let endTime = performance.now();
			let elapsedTime = endTime - startTime;
			total += elapsedTime;

			steps.push({
				time: elapsedTime.toFixed(2),
			});

			indexArr.push(lastIndex);
		}
	} catch (error) {
		console.log('[FORMAT_MATRIZ_ERROR]', error);
		return {
			success: false,
		};
	}

	return {
		sum,
		path: indexArr,
		steps,
		method: 'Math.max',
		total: total.toFixed(2),
		success: true,
	};
};

type HandlerProps = {
	matriz: TMatriz;
	lines: number;
	id?: string;
};

/**
 * @param {HandlerProps} params - Recebe a matriz, a quantidade de linhas e possívelmente um id se for uma atualização
 * @description Após invocada, a função irá filtrar os dados para e criar/atualizar a matriz
 * @returns {Promise<ReturnType>} - Retorna a resposta da ação
 */
export const handler = async ({
	matriz,
	lines,
	id,
}: HandlerProps): Promise<ReturnType> => {
	try {
		const { userId } = auth();
		if (!userId)
			return {
				success: false,
				error: 'Você precisa estar logado!',
			};

		if (matriz.length === 0)
			return {
				success: false,
				error: 'Ocorreu um erro!',
			};

		if (lines !== matriz.length) {
			matriz = matriz.slice(0, lines);
		}

		const { path, steps, sum, method, success, total } =
			formatMatriz(matriz);

		if (!success) {
			return {
				success: false,
				error: 'Ocorreu um erro!',
			};
		}

		if (typeof sum !== 'number')
			return {
				success: false,
				error: 'Ocorreu um erro!',
			};

		if (typeof method !== 'string' || method.length === 0)
			return {
				success: false,
				error: 'Ocorreu um erro!',
			};
		if (typeof total !== 'string' || method.length === 0)
			return {
				success: false,
				error: 'Ocorreu um erro!',
			};
		if (id) {
			const updatedMatriz = await prismadb.matriz.update({
				where: {
					id,
					userId,
				},
				data: {
					lines,
					matriz,
					path,
					steps,
					sum,
					method,
				},
			});

			return {
				success: true,
				message: 'Matriz atualizada!',
				data: updatedMatriz,
			};
		}
		const newMatriz = await prismadb.matriz.create({
			data: {
				lines,
				matriz,
				path,
				steps,
				timestamp: total,
				sum,
				method,
				userId,
			},
		});

		return {
			success: true,
			message: 'Matriz criada!',
			data: newMatriz,
		};
	} catch (error) {
		console.log('[HANDLER_MATRIZ_ERROR]', error);
		return {
			success: false,
			error: 'Ocorreu um erro!',
		};
	}
};
