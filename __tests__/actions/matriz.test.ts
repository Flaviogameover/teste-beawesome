import { checkMatriz, formatMatriz, handler } from '../../actions/matriz';

describe('checkMatriz', () => {
	test('Deverá retornar true pela matriz correta', () => {
		const validMatrix = [[1], [2], [3]];
		expect(checkMatriz(validMatrix)).toBe(true);
	});

	test('Deverá retornar false pela matriz inválida', () => {
		const invalidMatrix = [[1, 2], [3]];
		expect(checkMatriz(invalidMatrix)).toBe(false);
	});
});

describe('formatMatriz', () => {
	test('Deverá retornar os valores corretos dos inputs', () => {
		const matriz = [[1], [2, 3], [4, 6, 5], [10, 9, 8, 7]];
		const result = formatMatriz(matriz);

		expect(result.success).toBe(true);
		expect(typeof result.sum).toBe('number');
		expect(Array.isArray(result.path)).toBe(true);
		expect(Array.isArray(result.steps)).toBe(true);
		expect(result.method).toBe('Math.max');
		expect(typeof result.total).toBe('string');
	});

	test('Deverá retorar um erro pelo input inválido', () => {
		const invalidMatriz = [
			[1, 2],
			[3, 4],
		];
		const result = formatMatriz(invalidMatriz);

		expect(result.success).toBe(false);
	});
});

describe('handler', () => {
	test('Deverá ser criada ou atualizada a matriz com sucesso ', async () => {
		const matriz = [[1], [2, 3], [4, 6, 5], [10, 9, 8, 7]];
		const lines = 4;

		const resultUpdate = await handler({
			matriz,
			lines,
			id: '1',
			isTest: true,
		});
		expect(resultUpdate.success).toBe(true);
		if (resultUpdate.success) {
			expect(resultUpdate.message).toBe('Matriz atualizada!');
			expect(resultUpdate.data.id).toBe('1');
		}

		const resultCreate = await handler({ matriz, lines, isTest: true });
		expect(resultCreate.success).toBe(true);
		if (resultCreate.success) {
			expect(resultCreate.message).toBe('Matriz criada!');
			expect(resultCreate.data.id).toBe('2');
		}
	});

	test('Deverá retornar errors por inputs inválidos', async () => {
		const resultUpdateError = await handler({
			matriz: [],
			lines: 0,
			id: '1',
			isTest: true,
		});

		expect(resultUpdateError.success).toBe(false);
		if (!resultUpdateError.success) {
			expect(resultUpdateError.error).toBe('Ocorreu um erro!');
		}

		const resultCreateError = await handler({
			matriz: [],
			lines: 0,
			isTest: true,
		});

		expect(resultCreateError.success).toBe(false);
		if (!resultCreateError.success) {
			expect(resultCreateError.error).toBe('Ocorreu um erro!');
		}
	});
});
