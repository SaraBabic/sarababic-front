import { IMAGE_FRAGMENT } from './image';

export const STAGE_FRAGMENT = `
    stageSkyline
    stageHeadline
    stageText
    stageImage {
        ${IMAGE_FRAGMENT}
    }
`;
