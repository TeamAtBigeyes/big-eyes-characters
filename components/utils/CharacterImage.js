import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

const useStyles = makeStyles((theme) => ({
  parallaxBg: {
    paddingTop: "2%",
    paddingBottom: "2%",
    width: "96%"
  },
  parallax: {
    zIndex: "+1",
    paddingTop: "2%",
    paddingBottom: "2%",
    width: "96%"
  },
  hero: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

const BG_TRANSLATION_AMPLITUDE = 30
const AVATAR_TRANSLATION_AMPLITUDE = 5

function CharacterImage(props) {
  const { name, avatarImage, backgroundImage, style } = props
  const parallaxStyles = useStyles();

  const [size, setSize] = useState({ x: 0, y: 0 });

  const [globalCoords, setGlobalCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // 👇️ get global mouse coordinates
    const handleWindowMouseMove = event => {
      setGlobalCoords({
        x: event.screenX / window.screen.width,
        y: event.screenY / window.screen.height,
      });
    };
    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };
  }, []);

  const handleImageLoad = (event) => {
    setSize({ x: event.target.clientWidth, y: event.target.clientHeight })
  }

  return (
    <Grid container direction="row" className={style.layout}>
      <Grid item xs>
        <Card className={style.card}>
          <section className={parallaxStyles.hero}>
            {/* eslint-disable-next-line  @next/next/no-img-element */}
            <img
              src={backgroundImage}
              alt={name}
              className={parallaxStyles.parallaxBg}
              style={{
                filter: `blur(4px)`,
                transform: `translate(${-globalCoords.x * BG_TRANSLATION_AMPLITUDE + 0.52 * size.x}px,${-globalCoords.y * BG_TRANSLATION_AMPLITUDE + 18}px)`
              }}
            />
            {/* eslint-disable-next-line  @next/next/no-img-element */}
            <img
              src={avatarImage}
              alt={name}
              className={parallaxStyles.parallax}
              style={{
                transform: `translate(${globalCoords.x * AVATAR_TRANSLATION_AMPLITUDE - 0.5 * size.x}px,${globalCoords.y * AVATAR_TRANSLATION_AMPLITUDE}px)`
              }}
              onLoad={handleImageLoad}
            />
          </section>
        </Card>
      </Grid>
      {props.children}
    </Grid>
  )
}

export default CharacterImage 