'use client';

import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface TitleHeaderProps {
	label?: string;
	description?: string;
	action?: () => void;
}

export const TitleHeader = ({
	label,
	description,
	action,
}: TitleHeaderProps) => {


	return (
		<div className="flex my-5 justify-between items-center text-muted-foreground">
			<div className="w-96 flex flex-col gap-5 border-b border-muted-foreground">
				<h2 className="font-bold text-2xl">{label}</h2>
				<p className="text-sm">{description}</p>
			</div>
			{action && (
				<Button onClick={()=>action()} variant={'ghost'}>
					<PlusCircle />
				</Button>
			)}
		</div>
	);
};
