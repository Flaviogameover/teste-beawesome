export const LayoutLanding = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<div
				style={{ backgroundImage: `url(/bg.jpg)` }}
				className="flex flex-col justify-center bg-no-repeat bg-cover bg-center items-end h-full relative"
			>
				<div className="z-10 bg-black/50 absolute w-full h-full" />

				<div className="z-20 w-full flex justify-center max-w-5xl mx-auto items-center">
					{children}
				</div>
			</div>
			<footer className="py-2 text-sm text-white bg-primary/60 flex flex-col justify-center items-center">
				<span>Flávio Lima</span>
				<span>- {new Date().getFullYear()} -</span>
			</footer>
		</>
	);
};
