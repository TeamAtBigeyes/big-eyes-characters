
const galleryRoute = "/api/gallery"

const getImageURL = (hash, { skipRoute=false, preamble="", imageSize="1024x1024" } = {}) => {
    return `${preamble}${skipRoute? "": galleryRoute}/${hash}/?set=set4&bgset=any&size=${imageSize}`
}

const getAvatarImage = (hash, {preamble="", imageSize="1024x1024" } = {}) => {
    return `${preamble}${galleryRoute}/${hash}/?set=set4&size=${imageSize}`    
}

const getBackgroundImage = (hash, { preamble="", imageSize="1024x1024" } = {}) => {
    return `${preamble}${galleryRoute}/${hash}/?bgset=any&size=${imageSize}`
}

export { getAvatarImage, getBackgroundImage }
export default getImageURL