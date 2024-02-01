import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { sumTriangle } from '@/dummy';
import { useEffect, useLayoutEffect, useRef } from 'react';

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
			<CartMatriz triangle={triangle} path={path}/>
			<CardContent>
				<div className="space-y-1 p-2 border-b border-muted-foreground">
					<CardItem label="Soma" value={sum} />
					<CardItem label="Tamanho (linhas)" value={4} />
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

interface CardMatrizProps {
	triangle: number[][];
	path: number[];
}

const CartMatriz = ({ triangle, path }: CardMatrizProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const container = containerRef.current;
		if (!container || !triangle) return;
		let currentIndex = 0;
		container.innerHTML = '';
		for (let i = 0; i < triangle.length; i++) {
			const currentRow = triangle[i];

			const rowElement = document.createElement('div');
			rowElement.className = 'flex justify-center items-center';

			currentRow.forEach((item, index) => {
				const cellElement = document.createElement('div');
				cellElement.className =
					'w-12 h-12 m-1 border rounded-md border-muted-foreground/50 text-muted-foreground flex flex-col justify-center items-center';

				if (index === path[i]) {
					cellElement.classList.add(
						'bg-muted-foreground',
						'text-white'
					);
				}

				cellElement.textContent = item.toString();
				rowElement.appendChild(cellElement);
			});

			currentIndex = path[i];
			container.appendChild(rowElement);
		}
	}, [triangle, path]);

	return <div ref={containerRef} className="p-3" />;
};

interface CardItemProps {
	label: string;
	value: string | number;
}

const CardItem = ({ label, value }: CardItemProps) => {
	return (
		<div className="py-2 flex justify-between items-center font-semibold">
			<span>{label}</span>
			<span>{value}</span>
		</div>
	);
};
