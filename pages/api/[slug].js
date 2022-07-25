import prisma from "../../lib/prisma";

export default async(req, res) => {
    const slug = req.query["slug"];

    if (!slug || typeof slug !== "string"){
        res.statusCode = 404;

        res.send(JSON.stringify({message: "pls use with a slug"}));
        return;
    }

    const data = await prisma.shortLink.findFirst({
        where: {
            slug: {
              equals: slug
            }
        }
    });

    if (!data) {
      res.statusCode = 404;

      res.send(JSON.stringify({message: "slug not found"}));

      return;
    }

    return res.redirect(data.url);
}