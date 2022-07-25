import prisma from "../../../lib/prisma";

 const slugHandle = async (req, res) => {
  const slug = req.query["slug"];

  if (!slug || typeof slug !== "string") {
    res.statusCode = 404;

    res.send(JSON.stringify({ message: "pls use with a slug" }));
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

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "s-maxage=1000000000, stale-while-revalidate");

    res.send(JSON.stringify({ message: "slug not found" }));

    return;
  }

  // return res.redirect(data.url);
  return res.json(data);
}

export default slugHandle