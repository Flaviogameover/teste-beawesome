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
		orderBy: {
			created_at: "desc"
		}
	})

	return (
		<div className="h-full">
			<DashboardClient matrizes={matrizes}/>
		</div>
	);
};

export default DashboardPage;

