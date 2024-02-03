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
	method: string;
	steps: {
		time: string;
	}[];
	timestamp: string;
}

export const CardSingle = ({
	triangle,
	path,
	sum,
	id,
	method,
	steps,
	timestamp,
}: CardSingleProps) => {
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
		<Card className="w-[450px] border-muted-foreground/50">
			<CartMatriz triangle={triangle} path={path} />
			<CardContent>
				<div className="space-y-1 p-2 border-b border-muted-foreground">
					<CardItem label="Soma" value={sum} />
					<CardItem label="Tamanho (linhas)" value={path.length} />
					<CardItem label="Tempo total" value={timestamp} />
					<CardItem label="Método" value={method} />
					<div className="pb-1 flex flex-col justify-between items-center font-semibold">
						<span className="self-start">Steps</span>
						<span>{steps.map(item=>`${item.time}s`).join(' - ')}</span>
					</div>
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
					onClick={() => createMatriz.onOpen(id, triangle)}
					className="bg-muted-foreground border border-primary/90"
				>
					Editar
				</Button>
			</CardFooter>
		</Card>
	);
};
