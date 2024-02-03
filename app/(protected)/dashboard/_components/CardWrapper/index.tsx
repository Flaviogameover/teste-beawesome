import { MatrizDB } from '@/types';
import { CardSingle } from '../CardSingle';

interface CardWrapperProps {
	matrizes: MatrizDB[];
}

export const CardWrapper = ({ matrizes }: CardWrapperProps) => {
	return (
		<div className="my-5 py-3 flex items-start gap-8 flex-wrap justify-evenly">
			{matrizes.map((item) => (
				<CardSingle
					key={item.id}
					id={item.id}
					triangle={item.matriz}
					path={item.path}
					sum={item.sum}
					method={item.method}
					steps={item.steps}
					timestamp={item.timestamp}
				/>
			))}
		</div>
	);
};
