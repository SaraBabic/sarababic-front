import MainNavigation from './MainNavigation';
import Logo from '../molecules/Logo';

export default function Header() {
    return (
        <header id="header" className="bg-background sticky shadow-md top-0 z-50 transition-transform duration-300">
            <div className="mx-auto flex container items-center justify-between gap-8 py-6 px-8">
                <div className="flex">
                    <Logo animated />
                </div>

                <MainNavigation />
            </div>
        </header>
    );
}
