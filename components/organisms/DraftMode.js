'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

// https://nextjs.org/docs/app/building-your-application/configuring/draft-mode
// https://nextjs.org/docs/app/api-reference/functions/draft-mode

const DraftMode = () => {
    const router = useRouter();
    const pathname = usePathname();

    /**
     * Disable draft mode and redirect to non draft page
     */
    const disableDraftMode = async () => {
        const nonDraftPath = pathname.replace('/preview', '');
        await fetch(window.location.origin + '/api/preview/disable/');
        router.push(nonDraftPath);
    };

    return (
        <div className="fixed bottom-0 right-0 z-overlay flex">
            <span className="bg-[#ff0] p-1 px-2 text-[#000] block">Vorschaumodus</span>
            <button type="button" onClick={disableDraftMode} className="bg-[#dd0] hover:bg-[#bb0] transition-colors p-1 px-2 text-[#000] block">
                Beenden
            </button>
        </div>
    );
};

export default DraftMode;
