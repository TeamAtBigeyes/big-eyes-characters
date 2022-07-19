
const galleryRoute = "/api/gallery"
const IMAGE_SIZE = "1024x1024"

const getImageURL = (hash, options = { skipRoute: false, preamble: "" }) => {
    return `${options.preamble}${options.skipRoute? "": galleryRoute}/${hash}/?set=set4&bgset=any&size=1024x1024`
}

const postamble = `&size=${IMAGE_SIZE}`

const getAvatarImage = (hash, options = {preamble: ""}) => {
    return `${options.preamble}${galleryRoute}/${hash}/?set=set4${postamble}`    
}

const getBackgroundImage = (hash, options = {preamble: ""}) => {
    return `${options.preamble}${galleryRoute}/${hash}/?bgset=any${postamble}`
}

export { getAvatarImage, getBackgroundImage }
export default getImageURL