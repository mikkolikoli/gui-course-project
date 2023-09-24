import { Stack, List, Tooltip, Typography } from "@mui/material"
import { Workout } from "../firebase/firestore/objects"
import Set from "./set"

interface NextWorkoutProps {
    workouts: {workout: Workout, times: WorkoutTime[]}[]
}

export default function NextWorkout({ workouts }: NextWorkoutProps) {
    return (
        <Stack
            border={`${1}px solid`}
            borderColor="whitesmoke"
            bgcolor="#b4b4b4"
            color="black"
            width="25vw"
            m={2}
            ml={2}
            p={2}
        >
            <Typography variant="h2" component="h1">Today&apos;s workouts</Typography>
            <List>
                {workouts.map((workout, i) => (
                    <Typography key={i}>workout.name</Typography>
                ))}
            </List>
        </Stack>
    )
}