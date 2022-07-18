import { useState } from 'react';
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import React from 'react';
import Card from "@mui/material/Card";
import { LikeSvg, LoveSvg, LolSvg, WowSvg } from "./ReactionSvgs"
import ReactButton from "./ReactButton";
import { gql, useMutation } from '@apollo/client';
import { useCookies } from 'react-cookie';

const LIKEIT_REACTION = gql`
  mutation LikeIt ($hash: String){
    like(character: {hash: $hash}){
      likes
    }
  }
`

const WOW_REACTION = gql`
  mutation Wow ($hash: String){
    wow(character: {hash: $hash}){
      wows
    }
  }
`

const LOL_REACTION = gql`
  mutation Lol ($hash: String){
    lol(character: {hash: $hash}){
      lols
    }
  }
`

const LOVEIT_REACTION = gql`
  mutation LoveIt ($hash: String){
    loveIt(character: {hash: $hash}){
      loveIts
    }
  }
`

const UNLIKEIT_REACTION = gql`
  mutation UnlikeIt ($hash: String){
    unlike(character: {hash: $hash}){
      likes
    }
  }
`

const UNWOW_REACTION = gql`
  mutation Unwow ($hash: String){
    unwow(character: {hash: $hash}){
      wows
    }
  }
`

const UNLOL_REACTION = gql`
  mutation Unlol ($hash: String){
    unlol(character: {hash: $hash}){
      lols
    }
  }
`

const UNLOVEIT_REACTION = gql`
  mutation UnloveIt ($hash: String){
    unloveIt(character: {hash: $hash}){
      loveIts
    }
  }
`

class ReactButtonConfig{
  triggerReaction
  untriggerReaction
  reactionName
  reactionSvg
  hovering
  setHovering
  constructor(triggerReaction, untriggerReaction, reactionName, reactionSvg, data, hovering, setHovering){
    this.triggerReaction = triggerReaction
    this.untriggerReaction = untriggerReaction
    this.reactionName = reactionName
    this.reactionSvg = reactionSvg
    this.data = data
    this.hovering = hovering
    this.setHovering = setHovering
  }
}

function ReactButtons(props) {
  const { styles, character, queryHash } = props

  const [cookies, setCookie, removeCookie] = useCookies([queryHash]);
  const [likeitData, setLikeitData] = useState(undefined);
  const [loveitData, setLoveitData] = useState(undefined);
  const [lolData, setLolData] = useState(undefined);
  const [wowData, setWowData] = useState(undefined);
  const [hoveringLikeIt, setHoveringLikeIt] = useState(false);
  const [hoveringLoveIt, setHoveringLoveIt] = useState(false);
  const [hoveringLol, setHoveringLol] = useState(false);
  const [hoveringWow, setHoveringWow] = useState(false);

  const replaceUn = (data) => {
    const key = Object.keys(data)[0]
    if (key.startsWith("un")){
      const replacementKey = key.replace("un", "")
      data[replacementKey] = data[key]
      delete data[key]
    }
    return data
  }

  const setLike = (data) => {
    setLikeitData(replaceUn(data))
    // console.log(`Set Like data ${JSON.stringify(data)}`)
  }

  const setLove = (data) => {  
    setLoveitData(replaceUn(data))
    // console.log(`Set Love data ${JSON.stringify(data)}`)
  }  

  const setLol = (data) => {
    setLolData(replaceUn(data))
    // console.log(`Set Like data ${JSON.stringify(data)}`)
  }

  const setWow = (data) => {  
    setWowData(replaceUn(data))
    // console.log(`Set Love data ${JSON.stringify(data)}`)
  }

  const [likeReaction, {}] = useMutation(LIKEIT_REACTION, { variables: { hash: queryHash }, onCompleted: setLike});
  const [unlikeReaction, {}] = useMutation(UNLIKEIT_REACTION, { variables: { hash: queryHash }, onCompleted: setLike});
  const [loveitReaction, {}] = useMutation(LOVEIT_REACTION, { variables: { hash: queryHash }, onCompleted: setLove});
  const [unloveitReaction, {}] = useMutation(UNLOVEIT_REACTION, { variables: { hash: queryHash }, onCompleted: setLove});
  const [lolReaction, {}] = useMutation(LOL_REACTION, { variables: { hash: queryHash }, onCompleted: setLol});
  const [unlolReaction, {}] = useMutation(UNLOL_REACTION, { variables: { hash: queryHash }, onCompleted: setLol});
  const [wowReaction, {}] = useMutation(WOW_REACTION, { variables: { hash: queryHash }, onCompleted: setWow});
  const [unwowReaction, {}] = useMutation(UNWOW_REACTION, { variables: { hash: queryHash }, onCompleted: setWow});    

  const ReactButtonsConfig = [
    new ReactButtonConfig(likeReaction, unlikeReaction, "Like", LikeSvg, likeitData, hoveringLikeIt, setHoveringLikeIt),
    new ReactButtonConfig(loveitReaction, unloveitReaction, "LoveIt", LoveSvg, loveitData, hoveringLoveIt, setHoveringLoveIt),
    new ReactButtonConfig(lolReaction, unlolReaction, "Lol", LolSvg, lolData, hoveringLol, setHoveringLol),
    new ReactButtonConfig(wowReaction, unwowReaction, "Wow", WowSvg, wowData, hoveringWow, setHoveringWow)
  ]

  return (
    <Grid container direction="row" className={styles.layout}>
      <Grid item xs>
        <Card className={styles.card} >
          <CardContent>
            <Grid container direction="row" >
              {ReactButtonsConfig.map(reactButtonConfig => <ReactButton
                key={reactButtonConfig.reactionName}
                character={character}
                reactButtonConfig={reactButtonConfig}
                cookies={cookies}
                setCookie={setCookie}
                removeCookie={removeCookie}
                cookieName={queryHash}
                ReactButtonsConfig={ReactButtonsConfig}
              />)}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      {props.children}
    </Grid>
  )
}

export default ReactButtons