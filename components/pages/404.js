import React from 'react';

const NotFoundPage = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <h1 className="mt-4 text-2xl font-bold text-foreground sm:text-4xl max-w-screen-md">Die von Ihnen gesuchte Seite konnte leider nicht gefunden werden.</h1>
            </div>
        </main>
    );
};

export default NotFoundPage;
