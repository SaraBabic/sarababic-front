import { TEMPLATES_LIST } from '@framework/helpers/templates-list';

export const resolveAppData = (data = {}, variables) => {
    if (!data) {
        return { notFound: true };
    }

    if (data?.sites) {
        try {
            data.sites = JSON.parse(data.sites);
        } catch (error) {
            console.error('Sites resolver error ::: ', error);
        }
    }

    // Adjust logo
    if (Array.isArray(data?.settings?.logo)) {
        data.settings.logo = data.settings.logo?.[0];
    }

    // Adjust favicon
    if (Array.isArray(data?.settings?.favicon)) {
        data.settings.favicon = data.settings.favicon?.[0];
    }

    // Go trough all our sites and check if we find the matching site
    if (Array.isArray(data?.sites)) {
        data.sites?.map((site) => {
            // If site matches our query -> Set redirect to this sites baseUrl
            if (site?.handle === variables?.site) {
                data.currentSite = site;
                data.siteBaseURL = site.baseUrl?.replace(process.env.VERCEL_URL, '');
            }
        });
    }

    // Set homepage
    if (Array.isArray(data?.settings?.homepage)) {
        const homepage = data?.settings?.homepage?.[0];

        // Set homepage uri
        data.homepageURI = homepage?.uri;

        // Set homepage as entry
        if (variables?.uri === '/' || variables?.uri === homepage?.uri) {
            data.entry = homepage;
            data.isHomepage = true;
        }

        // If someone visits the homepage uri (e. g. /homepage/)
        if (variables?.uri === homepage?.uri) {
            data.redirectUrl = '/';

            if (data?.currentSite) {
                data.redirectUrl = data?.currentSite?.baseUrl;
            }
        }
    }

    // Adjust stage image
    if (Array.isArray(data?.entry?.stageImage)) {
        data.entry.stageImage = data.entry.stageImage?.[0];
    }

    // If no entry was found or we do not have a matching tempalte to render this entry
    if (!data?.entry?.id || !TEMPLATES_LIST[`${data?.entry?.sectionHandle}/${data?.entry?.typeHandle}`]) {
        data.notFound = true;
    }

    return data;
};
