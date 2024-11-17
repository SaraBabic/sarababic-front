/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: '*.ddev.site',
            },
            {
                hostname: '*.intention.de',
            },
        ],
    },
};

export default nextConfig;
