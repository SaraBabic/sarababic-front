'use client';

import { useState } from 'react';
import AppContext from '@/lib/context/app';

export const AppContextProvider = ({ initialState, children }) => {
    const [appState, setAppState] = useState(initialState);

    return <AppContext.Provider value={{ appState, setAppState }}>{children}</AppContext.Provider>;
};
