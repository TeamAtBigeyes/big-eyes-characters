import logo from '../public/logo.svg';
import Image from 'next/image'
import React from "react";
import { makeStyles } from "@mui/styles";
import { Container } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  // Styling material components
  appHeader: {
    minWidth: "100%",
    textAlign: "center",
    backgroundColor: "#282c34",
    minHeight: "100vh",
    display: "flex",
    flexFirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
    color: "white"
  },
  appLogo: {
    animation: "spin infinite 20s linear",
    height: "40vmin",
    pointerEvents: "none"
  }
}));

function Home() {

  const classes = useStyles()
  return (
    <Container maxWidth="sm" className={classes.appHeader}>
      <Image src={logo} priority={true} className={classes.appLogo} alt="logo" />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Container>
  );
}

export default Home;
