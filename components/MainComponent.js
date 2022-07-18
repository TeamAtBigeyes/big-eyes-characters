import Link from "next/link"
import Home from './Home'
import Character from './Character'

import React from "react";
import { makeStyles } from "@mui/styles";
import { gql, useQuery } from '@apollo/client';
import LoadingSpinner from "./LoadingSpinner";

const useStyles = makeStyles((theme) => ({
  // Styling material components
  root: {
    minHeight: "100vh",
    display: "flex",    
    backgroundColor: theme.palette.background.default,
  }
}));

function MainComponent(props) {
  const { query } = props
  const classes = useStyles();

  let theQuery = query
  if (query.hash === undefined)
    theQuery.hash="0x0000000000000000000000000000000000000000"

  const { loading, error, data } = useQuery(gql`
    query Character ($hash: String) {
      character (hash: $hash) {
        hash
        likes
        wows
        loveIts
        lols
      }
    }
  `, {variables: {
    "hash": theQuery.hash
  }});

  if (loading) return(<LoadingSpinner />);
  if (error) return `Error! ${error.message}`;

  return (
    <div className={classes.root}>
        <Link href="/">
          <Character query={theQuery} character={data.character}/>
        </Link>
        {/* <Link href="/home">
          <Home />
        </Link> */}
    </div>
  );
}

export default MainComponent;
