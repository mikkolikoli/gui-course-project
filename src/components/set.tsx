import { Box, List, ListItemText, Typography, Stack } from "@mui/material";
import { ExcerciseSet } from "../firebase/firestore/objects";

interface Props {
  excerciseSet: ExcerciseSet
}

export default function Set({excerciseSet}: Props) {
  return (
    <Stack justifyContent="center" spacing={1}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography>{excerciseSet.repetitions}x</Typography>

        <Box bgcolor='background.paper' p={1}>
          <List>
            {excerciseSet.excercises.map((excercise) => 
              <ListItemText key={excercise.id} primary={excercise.reps ? excercise.name + " x" + excercise.reps: excercise.name} />
            )}
          </List>
        </Box>
      </Stack>
      {excerciseSet.rest ? <Typography>Rest: {excerciseSet.rest.getTotalSeconds()}s</Typography>: null}
    </Stack>
  )
}