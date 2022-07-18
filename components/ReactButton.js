import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  item: {
    display: "flex",
    justifyContent: "center",
  },
  subtitle: {
    fontWeight: "bolder"
  },
  gridItem: {
    transition: "all .2s ease-in-out",
    padding: theme.spacing(3),
    '&:hover': {
      transform: "scale(1.1)"
    }
  }
})
);

const GRAYSCALE_WHEN_HOVERING = 0
const GRAYSCALE_WHEN_FADED = 25
const GRAYSCALE_WHEN_SELECTED = 75
const GRAYSCALE_WHEN_UNSELECTED = 100

const ReactButton = (props) => {
  const { character, reactButtonConfig, cookies, setCookie, removeCookie, cookieName, ReactButtonsConfig} = props;

  const classes = useStyles();

  const toLowerFirst = (str) => {
    return str.charAt(0).toLowerCase() + str.slice(1)
  }

  const mutationName = (config) => {
    return toLowerFirst(config.reactionName)
  }

  const reactionName = mutationName(reactButtonConfig);

  const triggerReactionAndSetCookie = () => {
    reactButtonConfig.triggerReaction()
    setCookie(cookieName, reactionName, {path: '/'})
  }

  const getCounter = (buttonConfig) => {
    const counterName = mutationName(buttonConfig) + 's'
    return (buttonConfig.data === undefined)? (character === null)? 0 : character[counterName]: buttonConfig.data[mutationName(buttonConfig)][counterName]
  }

  const handleClick = () => {
    if (cookies[cookieName] === undefined){
      triggerReactionAndSetCookie()
      // console.log(`Triggered ${reactionName}`)
    } else {
      const buttonConfig = ReactButtonsConfig.filter(res => mutationName(res) === cookies[cookieName])[0]
      // console.log(buttonConfig)
      if (cookies[cookieName] !== reactionName){
        // console.log(`Untriggered ${cookies.lastReaction}`)
        if(getCounter(buttonConfig) > 0)
          buttonConfig.untriggerReaction()

        triggerReactionAndSetCookie()
        // console.log(`Triggered ${reactionName}`)
      } else {
        if(getCounter(buttonConfig) > 0){
          buttonConfig.untriggerReaction()
          removeCookie(cookieName)
        }
      }
    }
  }

  // if (loading) return 'Submitting reaction...';
  // if (error) return `Reaction submission error! ${error.message}`;

  return (
    <Grid item xs
      className={classes.gridItem}
      onClick={handleClick}
      onMouseEnter={() => reactButtonConfig.setHovering(true)}
      onMouseLeave={() => reactButtonConfig.setHovering(false)}>
      <reactButtonConfig.reactionSvg style={{filter: `grayscale(${
        (reactButtonConfig.hovering)? GRAYSCALE_WHEN_HOVERING:
          (cookies[cookieName] === reactionName)?
            (ReactButtonsConfig.map(bc => bc.hovering).every(element => element === false))? GRAYSCALE_WHEN_FADED: GRAYSCALE_WHEN_SELECTED : GRAYSCALE_WHEN_UNSELECTED}%)`}}/>
      <span className={classes.item}>
        <Typography gutterBottom variant="h5" component="h2" className={classes.subtitle}>
          {(reactButtonConfig.hovering)? reactButtonConfig.reactionName : getCounter(reactButtonConfig)}
        </Typography>
      </span>
    </Grid>
  )
}

export default ReactButton;