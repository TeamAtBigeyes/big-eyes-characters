
const galleryRoute = "/api/gallery"

const getImageURL = (hash, options = { skipRoute: false, preamble: "" }) => {
    return `${options.preamble}${options.skipRoute? "": galleryRoute}/${hash}/?set=set4&bgset=any&size=1024x1024`
}

export default getImageURL
export { galleryRoute }