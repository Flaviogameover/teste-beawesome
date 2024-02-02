'use client';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Modal } from '@/components/Modal';
import { useCreateModal } from '@/hooks/useCreateModalStore';

export const CreateMatrizModal = () => {
	const isOpen = useCreateModal((state) => state.isOpen);
	const onClose = useCreateModal((state) => state.onClose);
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>
						Make changes to your profile here.
					</DialogDescription>
				</DialogHeader>
				<div>Opa</div>
				<DialogFooter>
					<Button type="submit">Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Modal>
	);
};
