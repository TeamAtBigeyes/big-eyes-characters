import '../styles/globals.scss'
import '../styles/Home.module.scss'
import '../styles/sharing.css'
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apollo-client";
import { useRouter } from "next/router";
import Head from 'next/head'
import getCharacterMemo from '../lib/get-character-memo';

// This default export is required in a new `pages/_app.js` file.
export function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const query = getCharacterMemo(router.query)
  
  return (
    <>
      <Head>
        <title>{`BigEyes ${query.name} Character Sheet`}</title>
      </Head>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  )
}

export default MyApp