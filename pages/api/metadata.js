import getImageURL from "../../lib/image-server"
import getUrl from "../../lib/getUrl"

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default function handler(req, res) {
  const { name, hash, appearance, story } = req.query
  res.status(200).json({
    "name": name,
    "description": `NFT of BigEyes character named ${name} with hash ${hash}`,
    // "image": getImageURL(hash, {preamble: "https://characters.bigeyes.space"}),
    "image": getImageURL(hash, {preamble: process.env.DOMAIN}),
    "meta": {
      "name": name,
      "appearance": appearance,
      "story": story,
      "hash": hash,
      "url": getUrl(req.query) 
    }
  })
}
