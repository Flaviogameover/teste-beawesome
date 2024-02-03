import { MatrizDB } from '@/types';
import { CardSingle } from '../CardSingle';

interface CardWrapperProps {
	matrizes: MatrizDB[];
}

export const CardWrapper = ({ matrizes }: CardWrapperProps) => {
	return (
		<div className="my-5 p-3 flex items-start gap-8 flex-wrap justify-evenly">
			{/* {triangles.map((_, index) => (
			<CardSingle key={index} triangle={triangles[index]} />
            trocar pelo real esquema do db
		))} */}
			{matrizes.map((item) => (
				<CardSingle
					key={item.id}
					id={item.id}
					triangle={item.matriz}
					path={item.path}
					sum={item.sum}
				/>
			))}
		</div>
	);
};
