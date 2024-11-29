import dynamic from 'next/dynamic';

export default {
    modules_headline_blocktype: dynamic(() => import('@/components/atoms/Headline')),
    modules_text_blocktype: dynamic(() => import('@/components/organisms/Text')),
    modules_columns_blocktype: dynamic(() => import('@/components/organisms/Layout/Columns')),
    modules_image_blocktype: dynamic(() => import('@/components/molecules/Image')),
    // modules_textimage_blocktype: dynamic(() => import('@/components/organisms/TextImage')),
    modules_group_blocktype: dynamic(() => import('@/components/organisms/Layout/Group')),
    modules_link_blocktype: dynamic(() => import('@/components/atoms/Link')),
    modules_entrylist_blocktype: dynamic(() => import('@/components/organisms/EntryList')),
    modules_contactform_blocktype: dynamic(() => import('@/components/organisms/ContactForm')),
};
