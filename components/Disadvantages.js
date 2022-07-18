import Typography from "@mui/material/Typography";

const listOfDisadvantages = [
  "Selfish",
  "Intense desire to be in open spaces",
  "Obsession with jumping from high places",
  "Mania for self washing",
  "Stubborn",
  "Slightly Extrabic",
  "Emotional Attachment"
]

function Disadvantages(props) {
  const { disadvantages } = props
  return (
    disadvantages.map((disadvantage, index) => {
      return (
        <Typography key={index} variant="body2" color="textSecondary" component="p">
          {disadvantage}
        </Typography>
      )
    })
  )
}

export { listOfDisadvantages }
export default Disadvantages 