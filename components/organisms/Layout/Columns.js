import React from 'react';
import { cn } from '@/lib/helpers/classnames';
import Modules from '@/components/organisms/Layout/Modules';
import Container from '@/components/organisms/Layout/Container';

const Columns = ({ columns, children: modules, backgroundColor }) => {
    let textColor = 'black';
    if (backgroundColor === 'black') {
        textColor = 'white';
    }
    return (
        <div className={`bg-${backgroundColor} text-${textColor}`}>
            <Container>
                <div
                    className={cn('flex flex-col lg:grid gap-12 lg:gap-24 column-wrapper py-8', {
                        'grid-cols-[1fr_1fr]': columns === '5050',
                        'grid-cols-[1fr_2fr]': columns === '3366',
                        'grid-cols-[2fr_1fr]': columns === '6633',
                        'grid-cols-[1fr_3fr]': columns === '2575',
                        'grid-cols-[3fr_1fr]': columns === '7525',
                    })}
                >
                    {Array.isArray(modules) ? <Modules modules={modules} section={false} moduleConfig={{ container: false }} /> : null}
                </div>
            </Container>
        </div>
    );
};

export default Columns;
