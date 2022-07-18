import Typography from "@mui/material/Typography";

const listOfAdvantages = [
  "Super elasticity",
  "Super hearing",
  "Super sight",
  "Long time memory",
  "Gigantism",
  "Cute"
]

function Advantages(props) {
  const { advantages } = props
  return (
    advantages.map((advantage, index) => {
      return (
        <Typography key={index} variant="body2" color="textSecondary" component="p">
          {advantage}
        </Typography>
      )
    })
  )
}

export { listOfAdvantages }
export default Advantages 