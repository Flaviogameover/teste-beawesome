'use client';

interface CardItemProps {
	label: string;
	value: string | number;
}

export const CardItem = ({ label, value }: CardItemProps) => {
	return (
		<div className="pb-1 flex justify-between items-center font-semibold">
			<span>{label}</span>
			<span>{value}</span>
		</div>
	);
};
