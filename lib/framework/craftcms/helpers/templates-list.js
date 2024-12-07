import dynamic from 'next/dynamic';

export const TEMPLATES_LIST = {
    'pages/page': dynamic(() => import('@/components/templates/Page')),
    'news/news': dynamic(() => import('@/components/templates/News')),
    'blogs/blog': dynamic(() => import('@/components/templates/Blog')),
    'projects/project': dynamic(() => import('@/components/templates/Project')),
};
