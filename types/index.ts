export type SuccessType = {
	success: true;
	message: string;
	data: any;
};

export type ErrorType = {
	success: false;
	error: string;
};
export type ReturnType = SuccessType | ErrorType;
export type TMatriz = number[][];

export type MatrizDB = {
	id: string;
	lines: number;
	matriz: TMatriz;
	path: number[];
	steps: {
		time: string;
	}[];
	sum: number;
	method: string;
	userId: string;
};

/**
 *
 */
