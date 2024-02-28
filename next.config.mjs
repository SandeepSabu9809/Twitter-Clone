/** @type {import('next').NextConfig} */
const nextConfig = { 
    // Define exportPathMap to enable static HTML export
    exportPathMap: function () {
        return {
            '/': { page: '/' },
            // Add other routes as needed
        };
    },
    // other configurations...
    output: {
        // generate files for the specified routes
        pages: '/',
        // other configurations...
    },
};

module.exports = nextConfig;
