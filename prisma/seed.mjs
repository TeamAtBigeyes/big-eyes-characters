import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData = [
  {
    name: 'teamatbigeyes',
    email: 'team@bigeyes.space',
    posts: {
      create: [
        {
          title: 'A simple post',
          content: 'This post is just an example of a post',
          published: true,
        },
      ],
    },
  }
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  const shortLink = await prisma.shortLink.create(
    {
      data: {
        url: "https://graphql.org/"
      }
    }
  )
  console.log(`Created shortLink with slug: ${shortLink.slug}`)
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })