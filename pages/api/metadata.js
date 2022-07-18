import getImageURL from "../../lib/image-server"

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default function handler(req, res) {
  const { name, hash, appearance, story } = req.query
  res.status(200).json({
    "name": name,
    "description": `NFT of BigEyes character named ${name} with hash ${hash}`,
    "image": getImageURL("https://characters.bigeyes.space", hash),
    "meta": {
      "name": name,
      "appearance": appearance,
      "story": story,
      "hash": hash,
      "url": `https://characters.bigeyes.space/?name=${name}&hash=${hash}&appearance=${appearance}&story=${story}` 
    }
  })
}
