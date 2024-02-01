'use client';
import { TitleHeader } from '@/components/TitleHeader';
import { CardSingle } from './_components/CardSingle';
import { triangles } from '@/constants/triangles';
import { sumTriangle } from '@/dummy';

const DashboardPage = () => {
	const action = () => {
		console.log('opa');
	};

	return (
		<div>
			<TitleHeader label="Painel" description="Gerencie suas matrizes" />
			<CardWrapper />
		</div>
	);
};

export default DashboardPage;

const CardWrapper = () => {
	const triangle = sumTriangle(triangles[0]);
	const triangle1 = sumTriangle(triangles[1]);
	const triangle2 = sumTriangle(triangles[2]);
	const triangle3 = sumTriangle(triangles[3]);

	return (
		<div className="my-5 p-3 flex items-start gap-8 flex-wrap justify-evenly">
			{/* {triangles.map((_, index) => (
			<CardSingle key={index} triangle={triangles[index]} />
            trocar pelo real esquema do db
		))} */}
			<CardSingle triangle={triangle.arr} path={triangle.path} sum={triangle.sum}/>
			<CardSingle triangle={triangle1.arr} path={triangle1.path} sum={triangle1.sum}/>
			<CardSingle triangle={triangle2.arr} path={triangle2.path} sum={triangle2.sum}/>
			<CardSingle triangle={triangle3.arr} path={triangle3.path} sum={triangle3.sum}/>
			<CardSingle triangle={triangle.arr} path={triangle.path} sum={triangle.sum}/>
			<CardSingle triangle={triangle.arr} path={triangle.path} sum={triangle.sum}/>
			<CardSingle triangle={triangle.arr} path={triangle.path} sum={triangle.sum}/>
			<CardSingle triangle={triangle.arr} path={triangle.path} sum={triangle.sum}/>
		</div>
	);
};
