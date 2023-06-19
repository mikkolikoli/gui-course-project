import { Stack, List, ListItem, ListItemText, Tooltip } from "@mui/material"
import { Workout } from "../types/excercise"

interface NextWorkoutProps {
    workout: Workout
}

export default function NextWorkout({ workout }: NextWorkoutProps) {
    return (
        <Stack
            border={`${1}px solid`}
            borderColor="whitesmoke"
            bgcolor="#b4b4b4"
            color="black"
            width="25vw"
            m={2}
            ml={2}
        >
            <h2>Next workout</h2>
        </Stack>
    )
}