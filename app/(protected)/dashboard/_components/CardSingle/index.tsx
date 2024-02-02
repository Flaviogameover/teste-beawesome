import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { CardItem } from '../CardItem';
import { CartMatriz } from '../CartMatriz';

export const CardSingle = ({
	triangle,
	path,
	sum,
}: {
	triangle: number[][];
	path: number[];
	sum: number;
}) => {
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
			<CardFooter className="flex justify-end">
				<Button variant="outline">Editar</Button>
			</CardFooter>
		</Card>
	);
};
