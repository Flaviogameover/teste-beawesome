import { ReturnType } from '@/types';
import { useCallback, useState } from 'react';

type ActionInput<TInput> = (input: TInput) => Promise<ReturnType>;

type ActionStatus<TOutput> = {
	onSuccess?: (data: TOutput, message?: string) => void;
	onError?: (error?: string) => void;
	onComplete?: () => void;
};


// Essa função controla o crud da aplicação
/**
 * @param {TInput} param - Recebe o handler = função à ser executada com "use server" do NextJS
 * @param {TOutput} param - Exporta funções para complementar a execução = onSuccess, onError, onComplete
 * @description Após invocada, a função irá executar o TInput e retornar seus possíveis status
 * @returns {object} - Retorna as ferramentas da função = execute, result, isLoading, error
 */
export const useAction = <TInput, TOutput>(
	action: ActionInput<TInput>,
	options: ActionStatus<TOutput> = {}
) => {
	const [result, setResult] = useState<TOutput | null>(null);
	const [error, setError] = useState<string | undefined>(undefined);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const execute = useCallback(
		async (input: TInput) => {
			setIsLoading(true);
			try {
				const req = await action(input);
				if (!req) return;

				if (!req.success) {
					setError(req.error);
					options.onError?.(req.error);
				}

				if (req.success) {
					setResult(req.data);
					options.onSuccess?.(req.data, req.message);
				}
			} finally {
				setIsLoading(false);
				options.onComplete?.();
			}
		},
		[action, options]
	);

	return {
		execute,
		result,
		isLoading,
		error,
	};
};
