import React, {useState} from "react";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import Attribute from "./Attribute";
import Skills from "./Skills";
import { styled } from '@mui/material/styles';
import Advantages from "./Advantages";
import Disadvantages from "./Disadvantages";
import TextDescription from "./TextDescription";
import useEffectOnlyOnce from "./utils/UseEffectOnlyOnce";
import getAttributes from "./utils/GetAttributes";
import CharacterImage from "./utils/CharacterImage";
import { getBackgroundImage, getAvatarImage } from '../lib/image-server'
import exifr from "exifr";
import { Unpackr } from 'msgpackr';
import ReactButtons from "./ReactButtons";
import SharingButtons from "./SharingButtons";
import { blue } from '@mui/material/colors';
const unpackr = new Unpackr({ mapsAsObjects: true, variableMapSize: true })

const color = blue[500]

const PrettoSlider = styled(Slider)({
  color: color,
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: color,
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});

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

const Character = React.forwardRef((props, ref) => {
  const {query, character } = props
  const {name, hash, story, appearance} = query

  const { basicAttributes, skills, advantages, disadvantages } = getAttributes(hash)

  const avatarImage = getAvatarImage(hash)
  const backgroundImage = getBackgroundImage(hash)

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

  const x0 = 0.00001
  const x1 = 100
  const y0 = 0.0000001
  const y1 = 1

  const rarityInLogScale = (y) => (x1 - x0)*(Math.log(y) - Math.log(y0))/(Math.log(y1) - Math.log(y0)) + x0
  const rarityLog = rarityInLogScale(metadata.rarity)

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
              <Attribute name="Rarity" value={`${metadata.rarity}`} styles={styles} >
                <PrettoSlider
                  // disabled
                  value={rarityLog.toFixed(2)}
                  marks={true}
                  step={10}
                  // valueLabelDisplay="on"
                  // aria-label="Disabled slider" />
                  valueLabelDisplay="auto"
                  aria-label="pretto slider" />
              </Attribute>
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
          <SharingButtons styles={styles} query={query}/>
        </Grid>
      </Grid>
    </div>
  );
})
Character.displayName = "Character";

export default Character