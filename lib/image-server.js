
const galleryRoute = "/api/gallery"

const getImageURL = (hash, options = { skipRoute: false, preamble: "", imageSize: "1024x1024" }) => {
    return `${options.preamble}${options.skipRoute? "": galleryRoute}/${hash}/?set=set4&bgset=any&size=${options.imageSize}`
}

const getAvatarImage = (hash, options = {preamble: "", imageSize: "1024x1024" }) => {
    return `${options.preamble}${galleryRoute}/${hash}/?set=set4&size=${options.imageSize}`    
}

const getBackgroundImage = (hash, options = { preamble: "", imageSize: "1024x1024" }) => {
    return `${options.preamble}${galleryRoute}/${hash}/?bgset=any&size=${options.imageSize}`
}

export { getAvatarImage, getBackgroundImage }
export default getImageURL