import { auth } from '@clerk/nextjs';
import { LayoutLanding } from '@/components/LayoutLanding';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Home = () => {
	const { userId } = auth();
	const url = userId ? '/dashboard' : '/sign-in';
	return (
		<div className="h-full">
			<LayoutLanding>
				<div className="flex flex-col justify-between items-center space-y-14 text-white">
					<div className="flex flex-col justify-center items-center gap-10">
						<h1 className="font-semibold text-4xl text-center">
							{'Bem vindo(a) ao TriMatriz!'}
						</h1>
						<p className="text-center text-sm">
							Aqui você poderá calcular um array bidimensional em
							formato de triângulo pelos maiores números! Clique
							em continuar, crie ou logue em sua conta para
							utilizar as funcionalidade.
						</p>
					</div>
					<Button asChild>
						<Link href={url}>Continuar</Link>
					</Button>
				</div>
			</LayoutLanding>

		</div>
	);
};

export default Home;
