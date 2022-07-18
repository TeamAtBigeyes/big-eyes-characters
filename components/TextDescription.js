import Typography from "@mui/material/Typography";
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  layout: {
    textAlign: "left"
  }
}));

function TextDescription(props) {
  const styles = useStyles();
  const { name, description } = props
  return (
    <div className={styles.layout}>
      <Typography variant="body2" display="inline" style={{}}>
        {name}{": "}
      </Typography>
      <Typography variant="body2" display="inline" color="textSecondary" component="p" style={{}}>
        {description}
      </Typography>
    </div>
  )
}

export default TextDescription 