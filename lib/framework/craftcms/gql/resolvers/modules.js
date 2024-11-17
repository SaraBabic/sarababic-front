import { ENTRY_LIST_RESOLVER } from './entries';

const MODULES_RESOLVERS_LIST = {
    modules_entryList_BlockType: ENTRY_LIST_RESOLVER,
};

export const MODULES_RESOLVER = async (modules, siteId) => {
    if (modules?.length) {
        await Promise.all(
            modules?.map(async (module) => {
                const moduleType = module?.__typename;
                const resolver = MODULES_RESOLVERS_LIST[moduleType];

                if (resolver) {
                    await resolver(module, siteId);
                }

                return false;
            })
        );
    }
};
