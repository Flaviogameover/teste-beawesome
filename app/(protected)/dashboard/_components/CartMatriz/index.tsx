'use client';

import { useRef, useEffect } from "react";

interface CardMatrizProps {
	triangle: number[][];
	path: number[];
}

export const CartMatriz = ({ triangle, path }: CardMatrizProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const container = containerRef.current;
		if (!container || !triangle) return;
		let currentIndex = 0;
		container.innerHTML = '';
		for (let i = 0; i < triangle.length; i++) {
			const currentRow = triangle[i];

			const rowElement = document.createElement('div');
			rowElement.className = 'flex justify-center items-center';

			currentRow.forEach((item, index) => {
				const cellElement = document.createElement('div');
				cellElement.className =
					'w-12 h-12 m-1 border rounded-md border-muted-foreground/50 text-muted-foreground flex flex-col justify-center items-center';

				if (index === path[i]) {
					cellElement.classList.add(
						'bg-muted-foreground',
						'text-white'
					);
				}

				cellElement.textContent = item.toString();
				rowElement.appendChild(cellElement);
			});

			currentIndex = path[i];
			container.appendChild(rowElement);
		}
	}, [triangle, path]);

	return <div ref={containerRef} className="p-3" />;
};

