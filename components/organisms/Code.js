'use client';

import React from 'react';
import '@deckdeckgo/highlight-code';
import Container from './Layout/Container';
import { defineCustomElements as deckDeckGoElement } from '@deckdeckgo/highlight-code/dist/loader';

const Code = ({ code }) => {
    deckDeckGoElement();
    return (
        <Container>
            <deckgo-highlight-code language="javascript" line-numbers={true}>
                <code slot="code">{code}</code>
            </deckgo-highlight-code>
        </Container>
    );
};

export default Code;
