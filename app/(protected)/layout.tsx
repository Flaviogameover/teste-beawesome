import { Button } from '@/components/ui/button';
import { ModalProvider } from '@/providers/modalProvider';
import { UserButton } from '@clerk/nextjs';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<ModalProvider />

			<div className="p-2 px-10 flex justify-between items-center bg-muted-foreground">
				<h1>TriMatriz Calc.</h1>

				<div className="flex items-center gap-x-5">
					<UserButton afterSignOutUrl="/" />

					<Button size={'sm'} variant={'ghost'}>
						Sair
					</Button>
				</div>
			</div>
			<div className="p-10">{children}</div>
		</>
	);
};

export default MainLayout;
//App para calcular soma de matrizes triangulares pelo maior de cada linha, sendo vizinho da útlima posição
