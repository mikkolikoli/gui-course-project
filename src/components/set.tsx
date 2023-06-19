import { Box, List, ListItemText, Typography } from "@mui/material";
import { ExcerciseSet } from "../types/excercise";

interface Props {
  excerciseSet: ExcerciseSet
}

export default function Set({excerciseSet}: Props) {
  return (
    <Box>
      <Box bgcolor='background.paper' p={1}>
      <List>
        {
          excerciseSet.excercises.map((excercise) => 
          <ListItemText key={excercise.id} primary={excercise.reps ? excercise.name + " x" + excercise.reps: excercise.name} />
        )}
      </List>
      </Box>
      <Typography>x{excerciseSet.repetitions}</Typography>
      {excerciseSet.rest ? <Typography>Rest: {excerciseSet.rest}s</Typography>: null}
    </Box>
  )
}