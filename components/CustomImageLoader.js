// CustomImageLoader.js
const customLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 100}`;
};
  
export default customLoader; // Ensure exporting the customLoader function
  