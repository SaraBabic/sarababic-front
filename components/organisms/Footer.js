import Logo from '../molecules/Logo';
import FooterNavigation from './FooterNavigation';

export default function Footer() {
    return (
        <footer className="mt-20 xl:mt-40 py-16 lg:px-8">
            <div className="container mx-auto px-8">
                <footer aria-labelledby="footer-heading">
                    <h2 id="footer-heading" className="sr-only">
                        Footer
                    </h2>
                    <div className="mx-auto">
                        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:justify-between lg:items-center">
                            <div className="-ml-1">
                                <Logo size="lg" />
                            </div>
                            <FooterNavigation />
                        </div>
                    </div>
                </footer>
            </div>
        </footer>
    );
}
