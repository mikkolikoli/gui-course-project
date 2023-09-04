import { Workout } from "@/src/firebase/firestore/objects"
import { Box } from "@mui/material"

interface WorkoutBoxProps {
  workout: Workout
}

export default function WorkoutBox({ workout }: WorkoutBoxProps) {
  return (
    <Box>
      <h3>{workout.name}</h3>
      
    </Box>
  )
}