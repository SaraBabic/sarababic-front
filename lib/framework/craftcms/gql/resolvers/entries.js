import { fetcher } from '@/lib/actions/api';

export const ENTRY_LIST_RESOLVER = async (module, siteId) => {
    const entries = await fetcher({
        key: 'entries_list',
        variables: {
            siteId,
            limit: module?.limit || 3,
            type: module?.entryType,
        },
    });

    module.entries = entries?.entries;
};
