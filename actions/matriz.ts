'use server';

import { auth } from '@clerk/nextjs';
import { ReturnType, TMatriz } from '@/types';
import { prismadb } from '@/lib/prismadb';

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
};

export const handler = async ({
	matriz,
	lines,
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

		const { path, steps, sum, method, success } = formatMatriz(matriz);

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

		const newMatriz = await prismadb.matriz.create({
			data: {
				lines,
				matriz,
				path,
				steps,
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
