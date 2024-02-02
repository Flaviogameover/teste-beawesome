import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { CardItem } from '../CardItem';
import { CartMatriz } from '../CartMatriz';
import { useCreateModal } from '@/hooks/useCreateModalStore';

export const CardSingle = ({
	triangle,
	path,
	sum,
}: {
	triangle: number[][];
	path: number[];
	sum: number;
}) => {
	const createMatriz = useCreateModal();

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
					onClick={() => {}}
					variant="outline"
				>
					Deletar
				</Button>
				<Button
					onClick={() => createMatriz.onOpen('', triangle)}
				>
					Editar
				</Button>
			</CardFooter>
		</Card>
	);
};
