import { ModalProvider } from '@/providers/modalProvider';
import { UserButton } from '@clerk/nextjs';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<ModalProvider />

			<div className="p-2 px-10 flex justify-between items-center bg-primary/75 border-b border-muted-foreground">
				<h1 className="font-semibold text-xl text-white">TriMatriz Calc.</h1>

				<div className="flex items-center gap-x-5">
					<UserButton afterSignOutUrl="/" />
				</div>
			</div>
			<div className="px-10 h-full">{children}</div>
		</>
	);
};

export default MainLayout;
//App para calcular soma de matrizes triangulares pelo maior de cada linha, sendo vizinho da útlima posição
