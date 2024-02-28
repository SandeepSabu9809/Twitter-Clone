/** @type {import('next').NextConfig} */
const nextConfig = { 
    // Define exportPathMap to enable static HTML export
    exportPathMap: function () {
        return {
            '/': { page: '/' },
            // Add other routes as needed
        };
    },
};

export default nextConfig;
