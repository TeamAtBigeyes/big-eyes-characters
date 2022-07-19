import { Email, Facebook, Twitter, WhatsApp, Telegram, LinkedIn, Pinterest, Tumblr, Reddit } from './buttons'
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import getUrl from '../lib/getUrl';
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
    padding: theme.spacing(1),
    '&:hover': {
      transform: "scale(1.1)"
    }
  }
})
);

const SharingButtons = (props) => {
  const { styles, query } = props
  const url = getUrl(query)
  const shareText = 'Check this site!'

  const classes = useStyles()

  const buttons = [
    <Email text={null} url={url} subject={null} onClick={null} />,
    <Facebook text={null} url={url} onClick={null} />,
    <Twitter text={null} url={url} shareText={shareText} onClick={null} />,
    <WhatsApp text={null} url={url} message={shareText} onClick={null} />,
    <Telegram text={null} url={url} message={shareText} onClick={null} />,
    <LinkedIn text={null} url={url} shareText={shareText} onClick={null} />,
    <Pinterest text={null} url={url} shareText={shareText} mediaSrc={null} onClick={null} />,
    <Tumblr text={null} url={url} title={null} caption={null} content={shareText} onClick={null} />,
    <Reddit text={null} url={url} onClick={null} />
  ]

  return (
    <Card className={styles.card} >
      <CardContent>
        <Grid container direction="row" className={styles.layout}>
          {buttons.map(button => <Grid item xs className={classes.gridItem}>{button}</Grid>)}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default SharingButtons