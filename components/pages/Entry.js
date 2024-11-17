import React from 'react';
import { TEMPLATES_LIST } from '@framework/helpers/templates-list';
import Modules from '@/components/organisms/Layout/Modules';

const Entry = ({ entry }) => {
    const TEMPLATE = TEMPLATES_LIST[`${entry?.sectionHandle}/${entry?.typeHandle}`];

    return <>{TEMPLATE ? <TEMPLATE entry={entry}>{entry?.modules ? <Modules modules={entry.modules} /> : null}</TEMPLATE> : null}</>;
};

export default Entry;
