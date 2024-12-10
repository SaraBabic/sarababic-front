'use client';

import React, { useContext } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import { fetcher } from '@/lib/actions/api';
import AppContext from '@/lib/context/app';
import Image from '../molecules/Image';
import Headline from '../atoms/Headline';
import Text from '../atoms/EditorText/EditorText';
import Container from './Layout/Container';

const EntryList = ({ entriesData, entryType, limit = 3 }) => {
    const { appState } = useContext(AppContext);
    const {
        data: { entries },
    } = useSWR(
        `entries_list_${entryType}_limit_${limit}_siteId=${appState?.appData?.currentSite?.id}`,
        () =>
            fetcher({
                key: 'entries_list',
                variables: {
                    siteId: appState?.appData?.currentSite?.id,
                    limit: limit,
                    type: entryType,
                },
            }),
        { fallbackData: { entries: entriesData } }
    );

    return (
        <Container>
            {Array.isArray(entries) ? (
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:grid-cols-3">
                    {entries?.map((entry) => {
                        const date = entry?.postDate ? new Date(entry.postDate) : null;

                        return (
                            <article key={entry.uid} className="flex max-w-xl flex-col items-start justify-between">
                                {entry?.image?.[0] ? (
                                    <Link href={`/${entry?.uri}/`} className="w-full mb-4 group overflow-hidden relative rounded-lg">
                                        <div className="aspect-[16/9] w-full group-hover:scale-110 bg-gray-100 transition-transform duration-300 sm:aspect-[2/1] lg:aspect-[3/2]">
                                            <Image {...entry?.image?.[0]} layout="fill" animation className="" />
                                        </div>
                                    </Link>
                                ) : null}

                                <div className="flex-grow">
                                    {date ? (
                                        <div className="text-xs">
                                            {date?.toLocaleDateString('de-DE', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                            })}
                                        </div>
                                    ) : null}
                                    <div className="mt-3 text-lg">
                                        <div>
                                            <Headline className="text-lg" headlineLevel={3} content={entry.headline || entry.title} />
                                        </div>
                                    </div>
                                    {entry?.blogType[0] ? (
                                        <p className={`bg-${entry?.blogType[0]?.categoryColor} w-fit p-[2px_16px] text-[12px] rounded-md text-white`}>
                                            {entry?.blogType[0]?.title}
                                        </p>
                                    ) : null}
                                    {entry.excerpt ? (
                                        <div className="mt-5 line-clamp-3 text-sm">
                                            <Text content={entry.excerpt} />
                                        </div>
                                    ) : null}
                                </div>

                                <div className="mt-8 flex font-semibold">
                                    <Link href={`/${entry?.uri}/`} className="text-sm group hover:text-black">
                                        Read more{' '}
                                        <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform duration-300 inline-block">
                                            &rarr;
                                        </span>
                                    </Link>
                                </div>
                            </article>
                        );
                    })}
                </div>
            ) : null}
        </Container>
    );
};

export default EntryList;
