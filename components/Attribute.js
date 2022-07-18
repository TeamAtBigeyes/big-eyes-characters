import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
// import CardActions from "@mui/material/CardActions";
// import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
// import CardMedia from "@mui/material/CardMedia";
// import Grid from "@mui/material/Grid";

function Attribute(props) {
  const { name, value, styles } = props
  return (
    <Grid container direction="row" className={styles.layout}>
      <Grid item xs>
        <Card className={styles.card} >
          <CardContent>
            <Grid container direction="row" >
              <Grid item xs >
                <Typography gutterBottom variant="h5" component="h2" style={{ fontWeight: "bold" }}>
                  {name}
                </Typography>
              </Grid>
              <Grid item xs >
                <Typography variant="h6" color="textSecondary" component="p">
                  {value}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      {props.children}
    </Grid>
  )
}

export default Attribute