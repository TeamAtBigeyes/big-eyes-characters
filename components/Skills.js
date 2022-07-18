import Typography from "@mui/material/Typography";

const listOfSkills = [
  "Super run",
  "Super strength",
  "Super jump",
  "Parachute fall",
  "Chill out",
  "Entertain",
  "Sharpen claws",
  "Cheer up friend",
  "Cat's paw",
  "Double scratch",
  "Grooming",
  "Steal food",
  "Lick wounds",
  "Feline uproar"
]

function Skills(props) {
  const { skills } = props
  return (
    skills.map((skill, index) => {
      return (
        <Typography key={index} variant="body2" color="textSecondary" component="p">
          {skill}
        </Typography>
      )
    })
  )
}

export { listOfSkills }
export default Skills 