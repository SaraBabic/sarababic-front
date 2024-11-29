export const moduleResolver = (module, name) => {
    let moduleData = module;
    if (name === 'modules_image_blocktype') {
        moduleData = {
            ...moduleData,
            ...moduleData.image?.[0],
        };
    } else if (name === 'modules_link_blocktype') {
        moduleData.linkData = moduleData.link?.[0];
    } else if (name === 'modules_textimage_blocktype' || name === 'modules_intro_blocktype') {
        moduleData.image = moduleData.image?.[0];
    }

    return moduleData;
};
