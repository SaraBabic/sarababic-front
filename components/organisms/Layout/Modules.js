import React, { Fragment } from 'react';
import { cn } from '@/lib/helpers/classnames';
import { moduleResolver } from '@framework/helpers/module-resolver';
import componentsList from '@framework/helpers/components-list';
import ConditionalWrapper from '@/components/organisms/Layout/ConditionalWrapper';
import AnimationWrapper from '@/components/molecules/AnimationWrapper';

const Modules = ({ modules, section = true, group = false, moduleConfig = null }) => {
    // console.log(modules);

    return (
        <>
            {modules?.map((module, index) => {
                const moduleName = module?.__typename?.toLowerCase();
                const Module = componentsList[moduleName];
                const moduleData = moduleResolver(module, moduleName);
                const uid = module?.uid;
                const anchorId = module?.anchorId;
                const bgColor = module?.bgColor;

                if (Module) {
                    return (
                        <Fragment key={uid}>
                            <ConditionalWrapper
                                condition={section || group}
                                wrapper={(children) => (
                                    <div
                                        id={anchorId}
                                        data-module={moduleName}
                                        data-anchor={anchorId}
                                        className={cn({
                                            'mt-section-mobile xl:mt-section-desktop scroll-mt-28': section,
                                            'mt-group-mobile xl:mt-group-desktop scroll-mt-14 first:mt-0': group,
                                            'py-section-mobile xl:py-section-desktop': section && bgColor && bgColor !== 'none',
                                            'last-of-type:mb-section-mobile lg:last-of-type:mb-section-desktop': section && (!bgColor || bgColor === 'none'),
                                        })}
                                    >
                                        {children}
                                    </div>
                                )}
                            >
                                <AnimationWrapper>
                                    <Module {...moduleData} index={index} {...moduleConfig} />
                                </AnimationWrapper>
                            </ConditionalWrapper>
                        </Fragment>
                    );
                }
            })}
        </>
    );
};

export default Modules;
