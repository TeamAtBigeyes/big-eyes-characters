import getImageURL from "../../lib/image-server"
import {getAvatarImage, getBackgroundImage} from "../../lib/image-server"
import getUrl from "../../lib/getUrl"

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default function handler(req, res) {
  const { name, hash, appearance, story } = req.query
  const domain = process.env.DOMAIN
  res.status(200).json({
    "name": name,
    "description": `NFT of BigEyes character named ${name} with hash ${hash}`,
    "image": getImageURL(hash, {preamble: domain}),
    "meta": {
      "name": name,
      "appearance": appearance,
      "story": story,
      "hash": hash,
      "avatarImg": getAvatarImage(hash, {preamble: domain}),
      "backgroundImg": getBackgroundImage(hash, {preamble: domain}),
      "url": getUrl(domain, req.query)
    }
  })
}
