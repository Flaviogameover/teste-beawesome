'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { CardItem } from '../CardItem';
import { CartMatriz } from '../CartMatriz';
import { useModalStore } from '@/hooks/useModalStore';
import { useAction } from '@/hooks/useAction';
import { handler } from '@/actions/delete-matriz';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface CardSingleProps {
	triangle: number[][];
	path: number[];
	sum: number;
	id: string;
}

export const CardSingle = ({ triangle, path, sum, id }: CardSingleProps) => {
	const createMatriz = useModalStore();
	const router = useRouter();
	const { execute, isLoading } = useAction(handler, {
		onSuccess: (data, message) => {
			toast.success(message);
			router.refresh();
		},
		onError: (error) => {
			toast.error(error);
		},
	});

	const handleDelete = () => {
		execute({ id });
	};

	return (
		<Card className="w-[350px] border-muted-foreground/50">
			<CartMatriz triangle={triangle} path={path} />
			<CardContent>
				<div className="space-y-1 p-2 border-b border-muted-foreground">
					<CardItem label="Soma" value={sum} />
					<CardItem label="Tamanho (linhas)" value={path.length} />
					<CardItem label="Tempo" value={'2s'} />
					<CardItem label="Método" value={'Math.max'} />
				</div>
			</CardContent>
			<CardFooter className="flex justify-between">
				<Button
					onClick={handleDelete}
					variant="outline"
					disabled={isLoading}
				>
					Deletar
				</Button>
				<Button
					disabled={isLoading}
					onClick={() => createMatriz.onOpen('', triangle)}
					className="bg-muted-foreground border border-primary/90"
				>
					Editar
				</Button>
			</CardFooter>
		</Card>
	);
};
