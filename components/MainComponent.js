import Link from "next/link"
import Character from './Character'

import React from "react";
import { makeStyles } from "@mui/styles";
import { gql, useQuery } from '@apollo/client';
import LoadingSpinner from "./LoadingSpinner";

const useStyles = makeStyles((theme) => ({
  // Styling material components
  root: {
    minHeight: "112vh",
    display: "flex",
    width: "99.485%",
    backgroundColor: theme.palette.background.default,
  }
}));

function MainComponent({query}) {
  const classes = useStyles();

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
    "hash": query.hash
  }});

  if (loading) return(<LoadingSpinner />);
  if (error) return `Error! ${error.message}`;

  return (
    <div className={classes.root}>
        <Link href="/">
          <Character query={query} character={data.character}/>
        </Link>
        {/* <Link href="/">
          <Home />
        </Link> */}
    </div>
  );
}

export default MainComponent;
