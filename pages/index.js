import React from 'react';
import '../styles/Home.module.scss'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';
import MainComponent from '../components/MainComponent'
import { useRouter } from "next/router";
import ClientOnly from "../components/ClientOnly";
import ColorModeContext from '../styles/ColorModeContext';

export const getServerSideProps = async context => {
  const { query } = context
  return { props: { } };
}

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    // ...(mode === 'light'
    //   ? {
    //       // palette values for light mode
    //       primary: amber,
    //       divider: amber[200],
    //       text: {
    //         primary: grey[900],
    //         secondary: grey[800],
    //       },
    //     }
    //   : {
    //       // palette values for dark mode
    //       primary: deepOrange,
    //       divider: deepOrange[700],
    //       background: {
    //         default: deepOrange[900],
    //         paper: deepOrange[900],
    //       },
    //       text: {
    //         primary: '#fff',
    //         secondary: grey[500],
    //       },
    //     }),
  },
});


function App(props) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const router = useRouter();
  const { query } = router
  const mode = prefersDarkMode ? "dark" : "light";
  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={mode}>
      <ThemeProvider theme={theme}>
        <ClientOnly>
          <MainComponent query={query} />
        </ClientOnly>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
