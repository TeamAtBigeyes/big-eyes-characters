import { Email, Facebook, Twitter, WhatsApp, Telegram, LinkedIn, Pinterest, Tumblr, Reddit } from './buttons'
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import getUrl from '../lib/getUrl';
import { makeStyles } from "@mui/styles";
import getImageURL from '../lib/image-server';
import { gql, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';


const CREATE_SHORTLINK = gql`
  mutation CreateShortLinkMutation($url: String!){
    createShortLink(url:$url){
      url
      slug
    }
  }
`

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
  const [link, setLink] = useState("");
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

  const [createShortLink, {}] = useMutation(CREATE_SHORTLINK, { variables: { url }, onCompleted: null});

  const getShortenedLink = async () => {
    const { data } = await createShortLink();
    return `${domain}/s/${data.createShortLink.slug}`;
  }
  
  const getAndSetLink = async () => {
    const theLink = await getShortenedLink();
    setLink(theLink);
  }

  // useEffect(() => {
  //   getAndSetLink();
  // }, []);


  const buttons = [
    <Email text={null} url={link} subject={subject} onClick={getAndSetLink} key={1}/>,
    <Facebook text={null} url={link} onClick={getAndSetLink} key={2}/>,
    <Twitter text={null} url={link} shareText={shareText} onClick={getAndSetLink} key={3}/>,
    <WhatsApp text={null} url={link} message={messsage} onClick={getAndSetLink} key={4}/>,
    <Telegram text={null} url={link} message={messsage} onClick={getAndSetLink} key={5}/>,
    <LinkedIn text={null} url={link} shareText={shareText} onClick={getAndSetLink} key={6}/>,
    <Pinterest text={null} url={link} shareText={shareText} mediaSrc={mediaSrc} onClick={getAndSetLink} key={7}/>,
    <Tumblr text={null} url={link} title={title} caption={caption} content={content} onClick={getAndSetLink} key={8}/>,
    <Reddit text={null} url={link} onClick={getAndSetLink} key={9}/>
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