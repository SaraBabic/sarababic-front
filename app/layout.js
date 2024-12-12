import { Orbitron, Montserrat } from 'next/font/google';
import '@/lib/styles/globals.scss';
import { ViewTransitions } from 'next-view-transitions';

const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });

export default function RootLayout({ children }) {
    return (
        <ViewTransitions>
            <html lang="de" className={`${orbitron.variable} ${montserrat.variable}`}>
                <body>{children}</body>
            </html>
        </ViewTransitions>
    );
}
