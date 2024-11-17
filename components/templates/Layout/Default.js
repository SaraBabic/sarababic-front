import React from 'react';
import { AppContextProvider } from '@/app/providers';
import Header from '@/components/organisms/Header';
import Entry from '@/components/pages/Entry';
import Footer from '@/components/organisms/Footer';

const DefaultLayout = ({ initialState }) => {
    return (
        <AppContextProvider initialState={initialState}>
            <div id="app-wrapper">
                <Header />
                <main>
                    <Entry entry={initialState?.entry} />
                </main>

                <Footer />
            </div>
        </AppContextProvider>
    );
};

export default DefaultLayout;
