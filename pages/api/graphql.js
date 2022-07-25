// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { gql, ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import prisma from '../../lib/prisma';

const typeDefs = gql`
  type Post {
    title:     String
    content:   String
    published: Boolean
    author:    User
  }
  type User {
    name:          String
    email:         String
    createdAt:     String
    updatedAt:     String
    posts:         [Post]
  }
  type Character {
    hash:    String
    likes:   Int
    lols:    Int
    loveIts: Int
    wows:    Int
  }

  type ShortLink {
    createdAt: String

    slug: String
    url: String
  }

  input CharacterInput {
    hash: String
  }

  type Query {
    characters: [Character]
    character(hash: String): Character
    hello: String
    posts: [Post]
    author: User
  }
  type Mutation {
    createShortLink(url: String!): ShortLink
    like(character: CharacterInput!): Character
    lol(character: CharacterInput!): Character
    loveIt(character: CharacterInput!): Character
    wow(character: CharacterInput!): Character
    unlike(character: CharacterInput!): Character
    unlol(character: CharacterInput!): Character
    unloveIt(character: CharacterInput!): Character
    unwow(character: CharacterInput!): Character    
  }
`;

const findCharacter = async (prismaCharacter, hash) => {
  return await prismaCharacter.findFirst({
    where: {
      hash
    }
  })
}

const findShortLink = async (prismaShortLink, url) => {
  return await prismaShortLink.findFirst({
    where: {
      url
    }
  })
}

const findOrCreateShortLink = async (prismaShortLink, url) => {
  let shortLink = await findShortLink(prismaShortLink, url)
  if (shortLink === null){
    shortLink = await prismaShortLink.create({
      data: {
        url
      }
    })
  }
  return shortLink
}

const findOrCreateCharacter = async (prismaCharacter, hash) => {
  let character = await findCharacter(prismaCharacter, hash)
  if (character === null){
    character = await prismaCharacter.create({
      data: {
        hash,
        likes: 0,
        lols: 0,
        loveIts: 0,
        wows: 0,
      }
    })
  }
  return character
}

const resolvers = {
  Query: {
    posts: async (_, _args, context) => {
      const posts = await context.prisma.post.findMany({
        where: { published: true },
        include: { author: true },
      })
      return posts
    },
    characters: async (_, _args, context) => {
      const characters = await context.prisma.character.findMany({
      })
      return characters
    },
    character: async (_, { hash }, context) => {
      const character = await context.prisma.character.findFirst({
        where: {
          hash
        }
      })
      return character
    },
  },
  Mutation: {
    createShortLink: async (_, { url }, context) => {
      return await findOrCreateShortLink(context.prisma.shortLink, url)
    },
    like: async (_, { character: { hash }}, context) => {
      let character = await findOrCreateCharacter(context.prisma.character, hash)
      character = await context.prisma.character.update({
        where: {
          hash
        },
        data: {
          likes: character.likes + 1,
        }
      })
      return character 
    },
    lol: async (_, { character: { hash }}, context) => {
      let character = await findOrCreateCharacter(context.prisma.character, hash)
      character = await context.prisma.character.update({
        where: {
          hash
        },
        data: {
          lols: character.lols + 1,
        }
      })
      return character 
    },
    loveIt: async (_, { character: { hash }}, context) => {
      let character = await findOrCreateCharacter(context.prisma.character, hash)
      character = await context.prisma.character.update({
        where: {
          hash
        },
        data: {
          loveIts: character.loveIts + 1,
        }
      })
      return character 
    },
    wow: async (_, { character: { hash }}, context) => {
      let character = await findOrCreateCharacter(context.prisma.character, hash)
      character = await context.prisma.character.update({
        where: {
          hash
        },
        data: {
          wows: character.wows + 1,
        }
      })
      return character 
    },
    unlike: async (_, { character: { hash }}, context) => {
      let character = await findCharacter(context.prisma.character, hash)
      character = await context.prisma.character.update({
        where: {
          hash
        },
        data: {
          likes: character.likes - 1,
        }
      })
      return character 
    },
    unlol: async (_, { character: { hash }}, context) => {
      let character = await findCharacter(context.prisma.character, hash)
      character = await context.prisma.character.update({
        where: {
          hash
        },
        data: {
          lols: character.lols - 1,
        }
      })
      return character 
    },
    unloveIt: async (_, { character: { hash }}, context) => {
      let character = await findCharacter(context.prisma.character, hash)
      character = await context.prisma.character.update({
        where: {
          hash
        },
        data: {
          loveIts: character.loveIts - 1,
        }
      })
      return character 
    },
    unwow: async (_, { character: { hash }}, context) => {
      let character = await findCharacter(context.prisma.character, hash)
      character = await context.prisma.character.update({
        where: {
          hash
        },
        data: {
          wows: character.wows - 1,
        }
      })
      return character 
    },        
  }
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  context: () => {
    return { prisma }
  },
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};