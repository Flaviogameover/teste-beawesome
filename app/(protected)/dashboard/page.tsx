import { prismadb } from '@/lib/prismadb';
import { DashboardClient } from './_components/DashboardClient';
import { auth } from '@clerk/nextjs';

const DashboardPage = async () => {


	const {userId} = auth();

	if(!userId) return null;

	const matrizes = await prismadb.matriz.findMany({
		where: {
			userId
		},
	})


	return (
		<DashboardClient matrizes={matrizes}/>
	);
};

export default DashboardPage;

