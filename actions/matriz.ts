'use server';

import { auth } from '@clerk/nextjs';
import { ReturnType, TMatriz } from '@/types';
import { prismadb } from '@/lib/prismadb';

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
		console.log(userId)
		if (!userId)
			return {
				success: false,
				error: 'Você precisa estar logado!',
			};

		const { path, steps, sum, method } = sumTriangle(matriz);

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
		console.log('[CREATE_MATRIZ_ERROR]', error);
		return {
			success: false,
			error: 'Ocorreu um erro!',
		};
	}
};

const checkMatriz = (matriz: TMatriz): boolean => {
	if (matriz[0].length !== 1) return false;
	return Array.isArray(matriz) && Array.isArray(matriz[0]);
};

interface Step {
	time: string;
}

type TSumMatriz = {
	sum: number;
	path: number[];
	steps: Step[];
	method: string;
	total: string;
};

const sumTriangle = (values: TMatriz): TSumMatriz => {
	let sum: number = 0;
	let lastIndex: number = 0;
	let indexArr: number[] = [];
	let steps: Step[] = [];
	let total: number = 0;
	if (!checkMatriz(values)) {
		//return message
	}

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

	return {
		sum,
		path: indexArr,
		steps,
		method: 'Math.max',
		total: total.toFixed(2),
	};
};
