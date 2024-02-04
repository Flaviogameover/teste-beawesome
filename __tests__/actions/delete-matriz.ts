import { handler } from '../../actions/delete-matriz';

describe('handler', () => {
	test('Deverá deletar a matriz com sucesso', async () => {
		const resultUpdate = await handler({
			id: '1',
			isTest: true,
		});
		expect(resultUpdate.success).toBe(true);
		if (resultUpdate.success) {
			expect(resultUpdate.message).toBe('Matriz deletada!');
		}
	});

	test('Deverá retornar errors por inputs inválidos', async () => {
		const resultUpdateError = await handler({
			id: 'w',
			isTest: true,
		});

		expect(resultUpdateError.success).toBe(false);
		if (!resultUpdateError.success) {
			expect(resultUpdateError.error).toBe('Ocorreu um erro!');
		}
	});
});
