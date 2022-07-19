import { Email, Facebook, Twitter, WhatsApp, Telegram, LinkedIn, Pinterest, Tumblr, Reddit } from './buttons'
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import getUrl from '../lib/getUrl';
import { makeStyles } from "@mui/styles";
import getImageURL from '../lib/image-server';

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
  const domain = process.env.NEXT_PUBLIC_DOMAIN
  const url = getUrl(domain, query)

  const { name, hash } = query
  const title = `NFT of BigEyes character named ${name} with hash ${hash}`

  const subject = title
  
  const caption = `${name}`

  const shareText = 'Check my BigEyes character!'
  const messsage = shareText
  const content = shareText

  const mediaSrc = getImageURL(hash, {preamble: domain})

  const classes = useStyles()

  const buttons = [
    <Email text={null} url={url} subject={subject} onClick={null} />,
    <Facebook text={null} url={url} onClick={null} />,
    <Twitter text={null} url={url} shareText={shareText} onClick={null} />,
    <WhatsApp text={null} url={url} message={messsage} onClick={null} />,
    <Telegram text={null} url={url} message={messsage} onClick={null} />,
    <LinkedIn text={null} url={url} shareText={shareText} onClick={null} />,
    <Pinterest text={null} url={url} shareText={shareText} mediaSrc={mediaSrc} onClick={null} />,
    <Tumblr text={null} url={url} title={title} caption={caption} content={content} onClick={null} />,
    <Reddit text={null} url={url} onClick={null} />
  ]

  return (
    <Card className={styles.card} >
      <CardContent>
        <Grid container direction="row" className={styles.layout}>
          {buttons.map(button => <Grid item xs className={classes.gridItem} key={button.type}>{button}</Grid>)}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default SharingButtons