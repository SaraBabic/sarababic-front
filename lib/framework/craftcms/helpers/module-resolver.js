export const moduleResolver = (module, name) => {
    let moduleData = module;

    if (name === 'areas_image_blocktype') {
        moduleData = {
            ...moduleData,
            ...moduleData.image?.[0],
        };
    } else if (name === 'modules_link_blocktype') {
        moduleData.linkData = moduleData.link?.[0];
    } else if (name === 'areas_textimage_blocktype' || name === 'areas_intro_blocktype') {
        moduleData.image = moduleData.image?.[0];
    }

    return moduleData;
};
