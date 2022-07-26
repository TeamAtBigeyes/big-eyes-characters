import logo from '../public/logo.svg';
import Image from 'next/image'

import { makeStyles, createStyles } from "@mui/styles";
import { Container } from "@mui/material";

const useStyles = makeStyles((theme) =>
  createStyles({
    appHeader: {
      textAlign: "center",
      backgroundColor: theme.palette.background.default,
      minWidth: "100%",
      minHeight: "100vh",
      display: "flex"
    },
    appLogo: {
      animation: "spin infinite 10s linear",
      height: "40vmin",
      pointerEvents: "none"
    }
  })
);

function LoadingSpinner() {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.appHeader}>
      <Image src={logo} priority={true} className={classes.appLogo} alt="logo" />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Container>
  );
}

export default LoadingSpinner
