/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["static.vecteezy.com"],
    },
    // Define exportPathMap to enable static HTML export
    exportPathMap: function () {
        return {
            '/': { page: '/' },
            // Add other routes as needed
        };
    },
};

export default nextConfig;
