import { Inter } from 'next/font/google';
import { Orbitron } from 'next/font/google';
import '@/lib/styles/globals.scss';
import { ViewTransitions } from 'next-view-transitions';

const inter = Inter({ subsets: ['latin'] });
const orbitron = Orbitron({ subsets: ['latin'] });

export default function RootLayout({ children }) {
    return (
        <ViewTransitions>
            <html lang="de">
                <body className={orbitron.className}>{children}</body>
            </html>
        </ViewTransitions>
    );
}
