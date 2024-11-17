import React from 'react';
import Modules from '@/components/organisms/Layout/Modules';
import Container from '@/components/organisms/Layout/Container';

const Group = ({ children: modules }) => {
    return (
        <>
            {Array.isArray(modules) ? (
                <Container>
                    <Modules modules={modules} section={false} group moduleConfig={{ container: false }} />
                </Container>
            ) : null}
        </>
    );
};

export default Group;
