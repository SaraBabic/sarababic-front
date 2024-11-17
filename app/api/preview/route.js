import { redirect } from 'next/navigation';
import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const entryType = searchParams.get('entryType') || 'page';
    const uri = searchParams.get('uri') || null;
    const siteId = searchParams.get('siteId') || null;
    const site = searchParams.get('site') || null;
    const token = searchParams.get('token') || null;

    // Check for the right query params
    if (!uri || !siteId) {
        return NextResponse.json(`Vorschau konnte nicht geladen werden.`, { status: 404 });
    }

    // Not in CMS preview mode --> just return to entry without preview
    if (!searchParams.get('x-craft-live-preview') && !searchParams.get('x-craft-preview') && !token) {
        redirect('/' + uri);
    }

    // Enable nextjs draft mode, so we can detect if we are in draft mode later
    // https://nextjs.org/docs/app/building-your-application/configuring/draft-mode
    // https://nextjs.org/docs/app/api-reference/functions/draft-mode
    draftMode().enable();

    // Redirect to the path from the fetched url
    redirect('/preview/' + uri + '?token=' + token + '&siteId=' + siteId + '&site=' + site + '&entryType=' + entryType);
}
