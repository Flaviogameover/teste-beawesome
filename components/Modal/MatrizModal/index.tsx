'use client';
import { handler } from '@/actions/matriz';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/ui/button';
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useAction } from '@/hooks/useAction';
import { useModalStore } from '@/hooks/useModalStore';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

enum STEPS {
	INITIAL = 0,
	MATRIZ = 1,
}

export const MatrizModal = () => {
	const [lines, setLines] = useState(0);
	const isOpen = useModalStore((state) => state.isOpen);
	const onClose = useModalStore((state) => state.onClose);
	const triangle = useModalStore((state) => state.triangle);
	const [page, setPage] = useState(STEPS.INITIAL);
	const [matriz, setMatriz] = useState<number[][]>([]);
	const router = useRouter();
	const { execute } = useAction(handler, {
		onSuccess: (data, message) => {
			toast.success(message);
			handleClose();
			router.refresh();
		},
	});

	useEffect(() => {
		if (triangle) {
			setLines(triangle.length);
			setMatriz(triangle);
			setPage(STEPS.MATRIZ);
		}
	}, [triangle]);

	useEffect(() => {
		if (lines > 10) setLines(10);
		if (lines < 1) setLines(1);
	}, [page, lines]);

	const title = triangle ? 'Editar matriz' : 'Criar matriz';
	const buttonTitle = triangle ? 'Atualizar' : 'Criar';

	const handleClose = () => {
		onClose();
		setPage(STEPS.INITIAL);
		setLines(0);
		handleResetMatriz();
	};

	const generateMatriz = (n: number) => {
		return Array.from({ length: n }, (_, i) => i + 1);
	};

	const handleAddInput = (row: number, pos: number, value: number) => {
		setMatriz((prevInputs) => {
			// Criar uma cópia do array original
			const newInputs = prevInputs.map((_) => [...(_ || [])]);

			// Preencher com arrays de tamanho fixo
			if (!newInputs[row]) {
				newInputs[row] = Array(generateMatriz(lines)[row]);
			}

			// Adicionar o valor à posição específica na linha
			newInputs[row][pos - 1] = value;

			return newInputs;
		});
	};

	const handleCreate = () => {
		//Todo: Criar funcao para adicionar no banco de dados apos filtragem
		execute({ matriz, lines });
	};

	const handleResetMatriz = () => {
		setMatriz((prev) => prev.map((item) => item.map((i) => 0)));
	};

	const HEADER = () => {
		switch (page) {
			case 0:
				return <DialogTitle>{title}</DialogTitle>;

			case 1:
				return (
					<div className="flex items-center gap-5">
						<ArrowLeft
							cursor={'pointer'}
							size={25}
							onClick={() => setPage(() => STEPS.INITIAL)}
						/>
						<DialogTitle>{title}</DialogTitle>
					</div>
				);
			default:
				return <DialogTitle>{title}</DialogTitle>;
		}
	};

	const BODY = () => {
		switch (page) {
			case 0:
				return (
					<div className="border-b border-muted-foreground/50 pb-5 flex items-center gap-5">
						<Input
							type="number"
							onChange={(e) => setLines(Number(e.target.value))}
							value={lines}
						/>
						<Button
							disabled={lines < 1}
							type="button"
							onClick={() => setPage(() => STEPS.MATRIZ)}
						>
							Adicionar linhas
						</Button>
					</div>
				);
			case 1:
				const sequence = generateMatriz(lines);
				return (
					<div className="flex flex-col justify-center items-center gap-5">
						{sequence.map((numberOfInputs, rowIndex) => (
							<div key={rowIndex} className="flex gap-5">
								{generateMatriz(numberOfInputs).map(
									(pos, index) => (
										<Input
											className="border text-center border-muted-foreground w-14 h-14"
											key={index}
											type="number"
											value={matriz?.[rowIndex]?.[index]}
											onChange={(e) =>
												handleAddInput(
													rowIndex,
													pos,
													Number(e.target.value)
												)
											}
										/>
									)
								)}
							</div>
						))}
					</div>
				);

			default:
				return (
					<div className="border-b border-muted-foreground/50 pb-5 flex items-center gap-5">
						<Input
							type="number"
							onChange={(e) => setLines(Number(e.target.value))}
							value={lines}
						/>
						<Button
							disabled={lines < 1 || lines > 10}
							type="button"
							onClick={() => setPage(() => STEPS.MATRIZ)}
						>
							Adicionar linhas
						</Button>
					</div>
				);
		}
	};
	return (
		<Modal isOpen={isOpen} onClose={handleClose}>
			<DialogContent
				className={cn(
					'w-full',
					page !== STEPS.INITIAL ? 'max-w-[95%]' : 'max-w-lg'
				)}
			>
				<DialogHeader>
					{HEADER()}
					<DialogDescription>
						Digite a quantidade de linhas que sua matriz possui, em
						seguida preencha e confirme os dados inseridos.
					</DialogDescription>
				</DialogHeader>
				{BODY()}
				{page !== STEPS.INITIAL && (
					<DialogFooter className="flex justify-between items-center">
						<Button
							type="button"
							variant={'outline'}
							onClick={handleResetMatriz}
							disabled={matriz.length === 0}
						>
							Limpar
						</Button>
						<Button
							type="button"
							onClick={handleCreate}
							disabled={matriz.length === 0}
						>
							{buttonTitle}
						</Button>
					</DialogFooter>
				)}
			</DialogContent>
		</Modal>
	);
};
