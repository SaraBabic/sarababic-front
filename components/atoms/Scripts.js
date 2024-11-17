import React, { Fragment } from 'react';
import Script from 'next/script';

const Scripts = ({ scripts }) => {
    return (
        <>
            {Array.isArray(scripts) && scripts?.length ? (
                <>
                    {scripts?.map((script) => (
                        <Fragment key={`script-${script.src}`}>
                            <Script {...script} />
                        </Fragment>
                    ))}
                </>
            ) : null}
        </>
    );
};

export default Scripts;
