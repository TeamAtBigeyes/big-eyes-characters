import encodeURI from '../components/utils/encodeURI'

const getUrl = ({name, hash, appearance, story}) => {
    return `${process.env.DOMAIN}/?name=${encodeURI(name)}&hash=${hash}&appearance=${encodeURI(appearance)}&story=${encodeURI(story)}`
}

export default getUrl