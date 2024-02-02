import { Button } from '@/components/ui/button';
import { ModalProvider } from '@/providers/modalProvider';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<ModalProvider />

			<div className="p-2 px-10 flex justify-between items-center bg-muted-foreground">
				<h1>Home</h1>
				<Button size={'sm'} variant={'ghost'}>
					Sair
				</Button>
			</div>
			<div className="p-10">{children}</div>
		</>
	);
};

export default MainLayout;
//App para calcular soma de matrizes triangulares pelo maior de cada linha, sendo vizinho da útlima posição
