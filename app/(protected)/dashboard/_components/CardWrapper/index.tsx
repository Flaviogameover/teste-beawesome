import { sumTriangle } from '@/dummy';
import { CardSingle } from '../CardSingle';
import { triangles } from '@/constants/triangles';

export const CardWrapper = () => {
	const triangle = sumTriangle(triangles[0]);

	return (
		<div className="my-5 p-3 flex items-start gap-8 flex-wrap justify-evenly">
			{/* {triangles.map((_, index) => (
			<CardSingle key={index} triangle={triangles[index]} />
            trocar pelo real esquema do db
		))} */}
			{Array.from({ length: 10 }).map((_, index) => (
				<CardSingle
					key={index}
					triangle={triangle.arr}
					path={triangle.path}
					sum={triangle.sum}
				/>
			))}
		</div>
	);
};
