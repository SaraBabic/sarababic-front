'use server';

import { MAIL_TEMPLATES } from '@/lib/constants/mail';
import { getAppData } from '@/lib/helpers/fetch-data';
import { fetcher } from './api';

// Server Action
export async function sendMail(data) {
    const { formData, template, appState } = data;
    const { appData } = await getAppData(null, appState?.appData?.currentSite?.handle);

    const templateData = MAIL_TEMPLATES[template];

    if (!templateData) {
        return {
            status: 404,
            message: 'Mail template not found',
        };
    }

    // Send mail
    const mailResponse = await fetcher({
        key: 'form_submission',
        variables: {
            formData: JSON.stringify(formData),
            emailAddress: appData?.settings?.contactEmail || 'dev@intention.de',
            template,
            subject: templateData.subject,
            text: templateData.text,
        },
    });

    return mailResponse;
}
