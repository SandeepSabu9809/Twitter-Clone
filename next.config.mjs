/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "static.vecteezy.com",
            'lh3.googleusercontent.com',
            'firebasestorage.googleapis.com',
            'image.cnbcfm.com',
            'a57.foxnews.com',
            'randomuser.me',
            'cdn.vox-cdn.com',
            'cdn.cnn.com',
            'www.reuters.com',
            'storage.googleapis.com',
            'images.axios.com',
            'i.kinja-img.com',
            'images.wsj.net',
            'content.fortune.com',
            'www.hollywoodreporter.com',
            'reports.mortgagenewsdaily.com',
            'bitcoinmagazine.com',
            'images.barrons.com',
            'i.ytimg.com',
            's.yimg.com',
            'd32r1sh890xpii.cloudfront.net',
            'www.orlandosentinel.com',
            'cnbcfm.com',
            'foxnews.com',
            'vox-cdn.com',
            'cnn.com',
            'reuters.com',
            'googleapis.com',
            'axios.com',
            'kinja-img.com',
            'wsj.net',
            'businesswire.com',
            'cloudfront.net',
            'orlandosentinel.com',
            'nj.com',
            'hollywoodreporter.com',
            'mortgagenewsdaily.com',
            'barrons.com',
            'yimg.com',
            'imgix.net',
            'techcrunch.com',
            'youtube.com',
            'kitco.com',
            'cointelegraph.com',
            'electrek.co',
            'ny.com',
            'mktw.net',
            'benzinga.com',
            'gannett-cdn.com',
            'endpts.com',
           
        ],
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
