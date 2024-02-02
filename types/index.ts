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

/**
 *
 */
