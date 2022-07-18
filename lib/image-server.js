
const galleryRoute = "/api/gallery/"

const getImageURL = (preamble, hash) => {
    return `${preamble}${galleryRoute}${hash}/?set=set4&bgset=any&size=1024x1024`
}

export default getImageURL
export { galleryRoute }