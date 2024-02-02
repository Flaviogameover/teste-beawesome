import type { Metadata } from 'next';
import { Mulish } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';

const mulish = Mulish({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Teste lógico',
	description: '-To be added-',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
		<html lang="en">
			<body className={mulish.className}>
				<main>{children}</main>
			</body>
		</html>
		</ClerkProvider>
	);
}
