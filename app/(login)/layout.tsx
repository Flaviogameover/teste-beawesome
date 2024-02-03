import { LayoutLanding } from '@/components/LayoutLanding';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="h-full w-full">
			<LayoutLanding>
				<div className="flex flex-col gap-5 items-center justify-center">
					{children}
					<Button className="bg-primary/50" asChild>
						<Link href={'/'}>Voltar</Link>
					</Button>
				</div>
			</LayoutLanding>
		</div>
	);
};

export default LoginLayout;
