import encodeURI from '../components/utils/encodeURI'

const getUrl = (preamble, {name, hash, appearance, story}) => {
    return `${preamble}/?name=${encodeURI(name)}&hash=${hash}&appearance=${encodeURI(appearance)}&story=${encodeURI(story)}`
}

export default getUrl