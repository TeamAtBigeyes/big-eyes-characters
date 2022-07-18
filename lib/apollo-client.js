// import { ApolloClient, InMemoryCache } from '@apollo/client';

// const client = new ApolloClient({
//   uri: 'http://localhost:3000/api/graphql',
//   cache: new InMemoryCache(),
// });

// export default client

import { ApolloClient, InMemoryCache, ApolloLink, createHttpLink } from '@apollo/client';
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const uri = '/api/graphql/';
const graphqlLink = createHttpLink({ uri });

const link = ApolloLink.from([errorLink, graphqlLink]);

const client = new ApolloClient({
  // uri: 'http://localhost:3000/api/graphql',
  link,
  cache: new InMemoryCache(),
});

export default client