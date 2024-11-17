import { APP_QUERY } from '@framework/gql/app';
import { FORM_SUBMISSION_QUERY } from './forms';
import { SITES_QUERY } from './sites';
import { ALL_ENTRIES_QUERY, ENTRIES_LIST_QUERY } from './entries';
import { META_QUERY } from './meta';
import { FAVICON_QUERY } from './favicon';
import { SITEMAP_QUERY } from './sitemap';

export const QUERIES = {
    app: APP_QUERY,
    meta: META_QUERY,
    sites: SITES_QUERY,
    entries_list: ENTRIES_LIST_QUERY,
    all_entries: ALL_ENTRIES_QUERY,
    form_submission: FORM_SUBMISSION_QUERY,
    favicon: FAVICON_QUERY,
    sitemap: SITEMAP_QUERY,
};
