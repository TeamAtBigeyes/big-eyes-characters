import React, {useState} from "react";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Attribute from "./Attribute";
import Skills from "./Skills";
import Advantages from "./Advantages";
import Disadvantages from "./Disadvantages";
import TextDescription from "./TextDescription";
import useEffectOnlyOnce from "./utils/UseEffectOnlyOnce";
import getAttributes from "./utils/GetAttributes";
import CharacterImage from "./utils/CharacterImage";
import { galleryRoute } from '../lib/image-server'
import exifr from "exifr";
import { Unpackr } from 'msgpackr';
import ReactButtons from "./ReactButtons";
const unpackr = new Unpackr({ mapsAsObjects: true, variableMapSize: true })

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      // flexGrow: 1,
      margin: theme.spacing(1),
      width: theme.spacing(32),
      height: theme.spacing(16),
    }
  },
  card: {
    width: "100%",
    height: "auto",
  },
  layout: {
    // paddingTop: theme.spacing(1),
    // paddingBottom: theme.spacing(1),
    // paddingLeft: theme.spacing(1),
    // paddingRight: theme.spacing(1),
    padding: theme.spacing(1),
    width: "100%",
    elevation: "1"
    // height: "auto"
  }
}));

const IMAGE_SIZE = "1024x1024"

const Character = React.forwardRef((props, ref) => {
  const {query, character } = props
  const {name, hash, story, appearance} = query

  const { basicAttributes, skills, advantages, disadvantages } = getAttributes(hash)
  const preamble = `${galleryRoute}${hash}/?`
  const postamble = `&size=${IMAGE_SIZE}`

  const avatarImage = `${preamble}set=set4${postamble}`
  const backgroundImage = `${preamble}bgset=any${postamble}`  

  const [metadata, setMetadata] = useState({ rarity: 0 });

  const styles = useStyles();

  useEffectOnlyOnce(
    (dependencies) => {
      const getMetadata = async () => {
        const image = new Image()
        image.src = avatarImage
        await image.decode()
        const { makerNote } = await exifr.parse(image, ['MakerNote'], {})
        // Unpack makerNote
        const metadata = JSON.parse(await unpackr.unpack(makerNote))
        setMetadata(metadata)
      }
      getMetadata()
    },
    [unpackr, exifr],
    () => true
  );

  // Return if still calculating attributes.
  // if (basicAttributes.length === 0)
  //   return
  if (metadata.rarity === 0)
    return
  const dx = basicAttributes[0]
  const iq = basicAttributes[1]
  const ht = basicAttributes[2]
  const st = basicAttributes[3]

  return (
    <div className={styles.root}>
      <Grid container direction="row" className={styles.layout}>
        <Grid container direction="row">
          <Grid item xs className={styles.layout}>
            <Card className={styles.card}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2" style={{ fontWeight: "bold" }}>
                  BigEyes
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Character Sheet
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs container direction="column" className={styles.layout}>
            <Card className={styles.card}>
              <CardContent>
                <TextDescription name="Name" description={`${name}`} />
                <TextDescription name="Appearance" description={`${appearance}`} />
                <TextDescription name="Character Story" description={`${story}`} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid container direction="row" >
          <Grid item xs container direction="column" >
            <Attribute name="Strength" value={`${st}`} styles={styles} />
            <Attribute name="Dexterity" value={`${dx}`} styles={styles} />
            <Attribute name="Intelligence" value={`${iq}`} styles={styles} />
            <Attribute name="Health" value={`${ht}`} styles={styles} />
            <ReactButtons styles={styles} character={character} queryHash={query.hash}/>
          </Grid>
          <Grid item xs container direction="column" className={styles.layout}>
            <Grid item xs >
              <CharacterImage avatarImage={avatarImage} backgroundImage={backgroundImage} name={name} style={styles} />
            </Grid>
            <Grid item xs >
              <Attribute name="Rarity" value={`${metadata.rarity}`} styles={styles} />
            </Grid>
          </Grid>
          <Grid item xs container direction="column" className={styles.layout}>
            <Grid item xs className={styles.layout}>
              <Card className={styles.card}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2" style={{ fontWeight: "bold" }}>
                    Advantages and Perks
                  </Typography>
                  <Advantages advantages={advantages} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs className={styles.layout}>
              <Card className={styles.card}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2" style={{ fontWeight: "bold" }}>
                    Disadvantages and Quirks
                  </Typography>
                  <Disadvantages disadvantages={disadvantages} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs className={styles.layout}>
              <Card className={styles.card}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2" style={{ fontWeight: "bold" }}>
                    Skills
                  </Typography>
                  <Skills skills={skills} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs className={styles.layout}>
          {/* eslint-disable-next-line react/no-unknown-property */}
          {/* <div class="sharethis-inline-share-buttons"></div> */}
        </Grid>
      </Grid>
    </div>
  );
})
Character.displayName = "Character";

export default Character